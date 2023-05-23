const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'avatars', // Optional folder name in Cloudinary
    allowedFormats: ['jpg', 'png', 'jpeg'], // Allowed file formats
    transformation: [{ width: 500, height: 500, crop: 'limit' }], // Optional image transformation
  },
});

const parser = multer({ storage });

module.exports = { cloudinary, parser };
