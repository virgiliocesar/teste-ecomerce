// Require the cloudinary library
const cloudinary = require("cloudinary").v2;

// Return "https" URLs by setting secure: true
cloudinary.config({
  secure: true,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const opts = {
  overwrite: true,
  invalidate: true,
  resource_type: "auto",
};

module.exports = async (image) => {
  try {
    const result = await cloudinary.uploader.upload(image, opts);
    return result.secure_url;
  } catch (error) {
    console.error(error.message);
    throw new Error("Erro ao fazer upload da imagem");
  }
};

