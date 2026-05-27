const OCR_API_URL = "https://server.jeanhua.cn/ocr";
const MAX_IMAGE_BASE64_LENGTH = 7_000_000;
const IMAGE_DATA_URL_PATTERN = /^data:image\/(png|jpeg|webp);base64,([A-Za-z0-9+/=]+)$/;

function parseBody(body) {
  if (typeof body === "string") {
    return body ? JSON.parse(body) : {};
  }
  return body || {};
}

function extractImageBase64(img) {
  if (typeof img !== "string" || img.length > MAX_IMAGE_BASE64_LENGTH) {
    throw new Error("Invalid image payload");
  }

  const match = img.match(IMAGE_DATA_URL_PATTERN);
  if (!match) {
    throw new Error("Image must be a PNG, JPG, JPEG, or WEBP data URL");
  }

  return match[2];
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  let imageBase64;
  try {
    const body = parseBody(req.body);
    imageBase64 = extractImageBase64(body.img);
  } catch (error) {
    return res.status(400).json({ error: "Invalid image payload" });
  }

  try {
    const ocrResponse = await fetch(OCR_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        img: imageBase64
      })
    });

    if (!ocrResponse.ok) {
      console.error("OCR provider request failed", ocrResponse.status);
      return res.status(502).json({ error: "OCR service is unavailable" });
    }

    const data = await ocrResponse.json();
    const text = typeof data.result === "string" ? data.result.trim() : "";

    if (!text) {
      return res.status(502).json({ error: "OCR service returned an empty result" });
    }

    return res.status(200).json({ text });
  } catch (error) {
    console.error("OCR API error", error.message);
    return res.status(500).json({ error: "OCR service is unavailable" });
  }
};