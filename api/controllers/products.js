const mongoose = require("mongoose");
const Product = require("../models/product");
// const Cart = require("../models/cart");


// Get all products
exports.get_all_products = (req, res, next) => {
  Product.find()
    .select("_id name price quantity instock productImage")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        products: docs.map(doc => {
          return {
            _id: doc._id,
            name: doc.name,
            category: doc.category,
            price: doc.price,
            quantity: doc.quantity,
            instock: doc.instock,
            productImage: doc.productImage,
            request: {
              type: "GET",
              url: "http://localhost:3001/products/" + doc._id
            }
          };
        })
      };
      if (docs.length >= 0) {
        res.status(200).json(response);
      } else {
        res.status(404).json({
          message: 'No entries found'
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}

//   Get one product
exports.get_product = (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .select('name price _id productImage')
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          product: doc,
          request: {
            type: 'GET',
            url: 'http://localhost:3001/products'
          }
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
}

//   Create product
exports.create_product = (req, res, next) => {
  console.log(req.file);
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    price: req.body.price,
    quantity: req.body.quantity,
    instock: req.body.instock,
    productImage: req.file.path
  });
  product
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created product successfully",
        createdProduct: {
          _id: result._id,
          name: result.name,
          description: result.description,
          category: req.body.category,
          price: result.price,
          quantity: result.quantity,
          instock: result.instock,
          request: {
            type: 'GET',
            url: "http://localhost:3001/products/" + result._id
          }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}

//   Update product
exports.update_product = (req, res, next) => {
  const id = req.params.productId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Product.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'Product updated',
        request: {
          type: 'GET',
          url: 'http://localhost:3001/products/' + id
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}

//   Delete product
exports.delete_product = (req, res, next) => {
  const id = req.params.productId;
  Product.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'Product deleted',
        request: {
          type: 'POST',
          url: 'http://localhost:3001/products',
          body: { name: 'String', price: 'Number' }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}


// exports.add_to_cart = function(req, res, next){
//   const productId = req.params.id;
//   const cart =  new Cart(req.session.cart ? req.session.cart : {});
//   Product.findById(productId, function (err, product){
//     if (err){
//       return res.redirect ('/');
//     }
//     cart.add(product, product.id);
//     req.session.cart = cart;
//     console.log(req.session.cart);
//     res.redirect('/');
//   });
// };

// exports.add_to_cart =  (req, res, next)=>{
//   const id = req.params.productId;
//   const cart =  new Cart(req.session.cart ? req.session.cart : {});
//   Product.findById(id)
//   .exec()
//   .then(result => {
//     cart.add(product = result.productId);
//     req.session.cart = cart;
//     console.log(req.session.cart);
//     res.redirect('/');
//   });
//   };

// exports.add_to_cart = (req, res, next) => {
//   const productId = req.params.id;
//   const cart = new Cart(req.session.cart ? req.session.cart : {});
//   Product.findById(productId)
//     .exec()
//     .then(result => {
//       console.log("From database");
//       cart.add({
//         product : result.productId});
//       req.session.cart = cart;
//       console.log(req.session.cart);
//       res.redirect('/');
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({ error: err });
//     });
// }

// exports.add_to_cart = (req, res, next) => {
//   const cart = new Cart(req.session.cart ? req.session.cart : {});
//   Product.findById(req.params.productId)
//     .then(product => {
//       if(!product) {
//         return res.status(404).json({
//           message: "Product not found"
//         });
//       } else {
//       cart.add({
//         product : req.body.productId,
//         qty : req.body.quantity,
//         price : req.body.price
//       });
//       req.session.cart = cart;
//       console.log(req.session.cart);
//       res.redirect('/');
//     }})
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({ error: err });
//     });
// }

// exports.add_to_cart = (req, res, next) => {
//   const cart = new Cart(req.session.cart ? req.session.cart : {});
//   Product.findById(req.params.productId)
//     .exec()
//     .then(product => {
//       if (!product) {
//         return res.status(404).json({
//           message: 'Product not found'
//         });
//       }
//       cart.add({
//         product: req.body.productId,
//         qty: req.body.quantity,
//         price: req.body.price
//       });
//       req.session.cart = cart;
//       console.log(req.session.cart);
//       res.redirect('/');
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({ error: err });
//     });
// }

// exports.shoppingcart = (req, res, next) => {
//   if (!req.session.cart) {
//     return res.render('/shopping-cart', { products: null });
//   }
//   var cart = new Cart(req.session.cart);
//   res.render('/shopping-cart', { products: cart.generateArray(), totalPrice: cart.totalPrice });
// }