const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "tvlocus6789",
  api_key: "574176583157511",
  api_secret: "9no-5cr1ppnKI9IPOEsjQ23t42Q",
});

module.exports = cloudinary;