const express = require("express");
const router = new express.Router();
const multer = require('multer');
const ServicesController = require('../controllers/services');
const verifytoken = require('../validation/verifyToken');

// Multer Middleware
// Adding an image to services
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    // cb(null, Date.now() + file.originalname)
    cb(null, new Date().toISOString().replace(/:|\./g,'') + ' - ' + file.originalname);;
  }
});
const fileFilter = (req, file, cb) => {
  //reject an image
  if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false), ({
      message: 'Image must be .jpg or .png'
    })
  }
};
const upload = multer({
  storage:storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

// Create service
router.post("/", verifytoken, upload.single('serviceImage'), ServicesController.create_service);

// Find all Services
router.get("/", ServicesController.get_all_services);

// Find one service
router.get("/:serviceId", ServicesController.find_one_service);

// Update service
router.patch("/:serviceId", verifytoken, ServicesController.update_service);

// Delete service
router.delete("/:serviceId", verifytoken, ServicesController.delete_service);

module.exports = router;