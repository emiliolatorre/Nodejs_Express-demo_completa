const Product = require('../models/products.model');



// READ
const getProduct = async (req, res) => {
        try {
            const id = req.params.id;
            let products = id? await Product.find({id},'-_id -__v') : await Product.find({},'-_id -__v'); //{}
            res.status(200).render("products.pug", {products,msj:"tus superproductos"}); // Respuesta de la API para 1 producto
        }
        catch (error) {
            console.log(`ERROR: ${error.stack}`);
            res.status(400).json({msj:`ERROR: ${error.stack}`});
        }
}

// CREATE
const createProduct = async (req, res) => {
    console.log(req.body);
    fetch("/api/products", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: req.body,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        res.redirect("/products");
      });
  };

module.exports = {
    getProduct,
    createProduct
}