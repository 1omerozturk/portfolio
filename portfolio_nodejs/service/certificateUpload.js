const { createHash } = require("node:crypto");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

async function uploadCertificatePdf(req, res) {
  const body = req.body;
  if (
    !Buffer.isBuffer(body) ||
    body.length < 8 ||
    body.subarray(0, 5).toString("ascii") !== "%PDF-"
  ) {
    return res.status(400).json({ message: "Geçerli bir PDF dosyası seçin." });
  }
  const {
    R2_ACCOUNT_ID,
    R2_ACCESS_KEY_ID,
    R2_SECRET_ACCESS_KEY,
    R2_BUCKET_NAME,
    R2_PUBLIC_URL,
  } = process.env;
  if (
    ![
      R2_ACCOUNT_ID,
      R2_ACCESS_KEY_ID,
      R2_SECRET_ACCESS_KEY,
      R2_BUCKET_NAME,
      R2_PUBLIC_URL,
    ].every(Boolean)
  ) {
    return res
      .status(503)
      .json({
        message:
          "PDF depolama henüz yapılandırılmamış. R2 sunucu ayarlarını tamamlayın.",
      });
  }
  let publicUrl;
  try {
    publicUrl = new URL(R2_PUBLIC_URL);
    if (
      publicUrl.protocol !== "https:" ||
      publicUrl.username ||
      publicUrl.password ||
      publicUrl.search ||
      publicUrl.hash ||
      !/^[a-f0-9]{32}$/i.test(R2_ACCOUNT_ID)
    )
      throw new Error("Invalid configuration");
  } catch {
    return res
      .status(503)
      .json({ message: "PDF depolama ayarlarını kontrol edin." });
  }
  const key = `certificates/${createHash("sha256").update(body).digest("hex")}.pdf`;
  const client = new S3Client({
    region: "auto",
    endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: R2_ACCESS_KEY_ID,
      secretAccessKey: R2_SECRET_ACCESS_KEY,
    },
    requestChecksumCalculation: "WHEN_REQUIRED",
  });
  try {
    await client.send(
      new PutObjectCommand({
        Bucket: R2_BUCKET_NAME,
        Key: key,
        Body: body,
        ContentType: "application/pdf",
        ContentDisposition: "inline",
        CacheControl: "public, max-age=31536000, immutable",
      }),
      { abortSignal: AbortSignal.timeout(30000) },
    );
    return res
      .status(201)
      .json({
        url: `${publicUrl.href.replace(/\/+$/, "")}/${key}`,
        size: body.length,
      });
  } catch {
    return res
      .status(502)
      .json({
        message:
          "PDF yüklenemedi. Depolama erişimini kontrol edip yeniden deneyin.",
      });
  } finally {
    client.destroy();
  }
}
module.exports = { uploadCertificatePdf };
