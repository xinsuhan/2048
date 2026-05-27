const DASHSCOPE_API_URL = "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions";
const OCR_MODELS = ["qwen-vl-ocr-latest", "qwen-vl-ocr"];
const MAX_IMAGE_BASE64_LENGTH = 7_000_000;
const IMAGE_DATA_URL_PATTERN = /^data:image\/(png|jpe?g|webp);base64,([A-Za-z0-9+/=]+)$/;
const OCR_PROMPT = "请识别图片中的文字，尽量保持原文顺序，只输出识别到的文字。如果没有文字，请输出空字符串。Recognize simplified Chinese accurately.";

function parseBody(body) {
  if (typeof body === "string") {
    return body ? JSON.parse(body) : {};
  }
  return body || {};
}

function normalizeImageDataUrl(image) {
  if (typeof image !== "string" || image.length > MAX_IMAGE_BASE64_LENGTH) {
    throw new Error("image payload is too large or invalid");
  }

  const match = image.match(IMAGE_DATA_URL_PATTERN);
  if (!match) {
    throw new Error("image must be a PNG, JPG, JPEG, or WEBP data URL");
  }

  return {
    mimeType: `image/${match[1] === "jpg" ? "jpeg" : match[1]}`,
    dataUrl: image,
    base64Length: match[2].length
  };
}

function sendOcrError(res, status, detail) {
  return res.status(status).json({
    error: "OCR failed",
    detail
  });
}

function extractText(data) {
  const content = data?.choices?.[0]?.message?.content;
  if (typeof content === "string") {
    return content.trim();
  }

  if (Array.isArray(content)) {
    return content
      .map((part) => {
        if (typeof part === "string") {
          return part;
        }
        if (typeof part?.text === "string") {
          return part.text;
        }
        return "";
      })
      .join("\n")
      .trim();
  }

  return "";
}

async function callDashScope(model, imageDataUrl) {
  const response = await fetch(DASHSCOPE_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.DASHSCOPE_API_KEY}`
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: OCR_PROMPT
            },
            {
              type: "image_url",
              image_url: {
                url: imageDataUrl
              }
            }
          ]
        }
      ]
    })
  });

  const responseText = await response.text();
  console.info("Vision OCR response", {
    model,
    status: response.status,
    preview: responseText.slice(0, 200)
  });

  return { response, responseText };
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  let imagePayload;
  try {
    const body = parseBody(req.body);
    imagePayload = normalizeImageDataUrl(body.image);
  } catch (error) {
    return sendOcrError(res, 400, error.message);
  }

  if (!process.env.DASHSCOPE_API_KEY) {
    return sendOcrError(res, 500, "DASHSCOPE_API_KEY is not configured");
  }

  console.info("Vision OCR request", {
    mimeType: imagePayload.mimeType,
    base64Length: imagePayload.base64Length
  });

  let lastDetail = "OCR service is unavailable";
  for (const model of OCR_MODELS) {
    try {
      const { response, responseText } = await callDashScope(model, imagePayload.dataUrl);
      if (!response.ok) {
        lastDetail = `${model} returned ${response.status}`;
        continue;
      }

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (error) {
        lastDetail = `${model} returned invalid JSON`;
        continue;
      }

      const text = extractText(data);
      if (!text) {
        return sendOcrError(res, 422, "OCR 未识别到文字，请尝试更清晰、对比度更高的图片。");
      }

      return res.status(200).json({ text });
    } catch (error) {
      console.error("Vision OCR API error", {
        model,
        message: error.message
      });
      lastDetail = `${model} request failed`;
    }
  }

  return sendOcrError(res, 502, lastDetail);
};