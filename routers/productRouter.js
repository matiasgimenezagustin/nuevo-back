const express = require('express');

const { getProducts } = require('../dao/controllers/productController');
const { getProductById } = require('../dao/repositories/productRepository');
const routerProducts = express.Router();



routerProducts.get('/', getProducts)

routerProducts.get('/:pid', async (req, res) =>{
  console.log(req.user)
  const {pid} = req.params
  const product = await getProductById(pid)
  if(product){
    res.render('detail', {isUser: req.user.role == 'usuario', product, user: req.user})
  }
})


// Resto de las rutas de productos
// ...

module.exports = routerProducts;
