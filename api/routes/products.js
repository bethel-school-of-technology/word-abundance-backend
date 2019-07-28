const express = require("express");
const router = new express.Router();
const multer = require('multer');
const ProductsController = require('../controllers/products')
const verifytoken = require('../validation/verifyToken');


// Multer Middleware
// Adding an image to products
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



// Create products
router.post("/", verifytoken, upload.single('productImage'), ProductsController.create_product);

// Find all products
router.get("/",  ProductsController.get_all_products );

// Find one product
router.get("/:productId", ProductsController.get_product );

// Update one product
router.patch("/:productId", verifytoken, ProductsController.update_product);

// Delete one product
router.delete("/:productId", verifytoken, ProductsController.delete_product);

module.exports = router;