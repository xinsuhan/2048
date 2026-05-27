const OCR_API_URL = "https://server.jeanhua.cn/ocr";
const MAX_IMAGE_BASE64_LENGTH = 7_000_000;
const IMAGE_DATA_URL_PATTERN = /^data:image\/(png|jpe?g|webp);base64,([A-Za-z0-9+/=]+)$/;

function parseBody(body) {
  if (typeof body === "string") {
    return body ? JSON.parse(body) : {};
  }
  return body || {};
}

function extractImagePayload(img) {
  if (typeof img !== "string" || img.length > MAX_IMAGE_BASE64_LENGTH) {
    throw new Error("image payload is too large or invalid");
  }

  const match = img.match(IMAGE_DATA_URL_PATTERN);
  if (!match) {
    throw new Error("image must be a PNG, JPG, JPEG, or WEBP data URL");
  }

  return {
    mimeType: `image/${match[1] === "jpg" ? "jpeg" : match[1]}`,
    base64: match[2]
  };
}

function sendOcrError(res, status, detail) {
  return res.status(status).json({
    error: "OCR failed",
    detail
  });
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  let imagePayload;
  try {
    const body = parseBody(req.body);
    imagePayload = extractImagePayload(body.img);
  } catch (error) {
    return sendOcrError(res, 400, error.message);
  }

  console.info("OCR request", {
    mimeType: imagePayload.mimeType,
    base64Length: imagePayload.base64.length
  });

  try {
    const ocrResponse = await fetch(OCR_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        img: imagePayload.base64
      })
    });

    const responseText = await ocrResponse.text();
    console.info("OCR response", {
      status: ocrResponse.status,
      preview: responseText.slice(0, 200)
    });

    if (!ocrResponse.ok) {
      return sendOcrError(res, 502, `provider returned ${ocrResponse.status}`);
    }

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (error) {
      return sendOcrError(res, 502, "provider returned invalid JSON");
    }

    const text = typeof data.result === "string" ? data.result.trim() : "";

    if (!text) {
      return sendOcrError(res, 422, "OCR 未识别到文字，请尝试更清晰、对比度更高的图片。");
    }

    return res.status(200).json({ text });
  } catch (error) {
    console.error("OCR API error", error.message);
    return sendOcrError(res, 500, "OCR service is unavailable");
  }
};