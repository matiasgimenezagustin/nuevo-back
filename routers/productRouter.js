const express = require('express');

const productController = require('../dao/controllers/productController');
const CustomError = require('../managers/errorManager');
const ERRORS = require('../handlers/errorHanlder');
const { checkUserRole } = require('../middleweres/authMiddlewere');
const Product = require('../dao/models/product');


const routerProducts = express.Router();

routerProducts.get('/', productController.getProducts );

//Antiguo codigo 
/* async (req, res) => {
  try {
    const result = await productController.getProducts();
    res.status(200).json(result);
  } catch (error) {
    const customError = new CustomError(ERRORS.INTERNAL_SERVER_ERROR.message, ERRORS.INTERNAL_SERVER_ERROR.status);
    req.logger.error(customError)
    res.status(customError.status).json({ error: customError.message });
  }
} */
routerProducts.get('/:pid', async (req, res) => {
  try {
    const pid = req.params.pid;
    const product = await productController.getProductById(pid);

    // Verificar si el usuario actual es el propietario del producto
    console.log({owner: product.owner})
    const isOwner =  product.owner === req.user.id;

    res.status(200).render('detail', { product, isUser: req.user.role === 'user', isOwner, user: req.user});
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.status).json({ error: error.message });
    } else {
      const customError = new CustomError(ERRORS.INTERNAL_SERVER_ERROR.message, ERRORS.INTERNAL_SERVER_ERROR.status);
      req.logger.error(customError);
      res.status(customError.status).json({ error: customError.message });
    }
  }
});




routerProducts.post('/delete/:pid', checkUserRole, async (req, res) => {
  try {
    const { pid } = req.params;
    const response = await productController.deleteProduct(pid);
    res.status(200).json(response);
  } catch (error) {
    const customError = new CustomError(ERRORS.INTERNAL_SERVER_ERROR.message, ERRORS.INTERNAL_SERVER_ERROR.status);
    req.logger.error(customError)
    res.status(customError.status).json({ error: customError.message });
  }
});

routerProducts.post('/', checkUserRole, async (req, res) => {
  try {
    const newProduct = req.body;
    console.log(req.user.id)
    const response = await productController.createProduct(newProduct, req.user.id);
    res.status(200).redirect('/products');
  } catch (error) {
    const customError = new CustomError(ERRORS.INTERNAL_SERVER_ERROR.message);
    req.logger.error(customError)
    res.status(400).json({ error: customError.message });
  }
});

routerProducts.put('/:pid', checkUserRole,  async (req, res) => {
  try {
    const updatedProduct = req.body;
    const { pid } = req.params;
    const response = await productController.updateProductById(pid, updatedProduct);
    res.status(200).json(response);
  } catch (error) {
    const customError = new CustomError(ERRORS.INTERNAL_SERVER_ERROR.message, ERRORS.INTERNAL_SERVER_ERROR.status);
    req.logger.error(customError)
    res.status(customError.status).json({ error: customError.message });
  }
});

routerProducts.delete('/:pid', checkUserRole, async (req, res) => {
  try {
    const { pid } = req.params;
    const response = await productController.deleteProduct(pid);
    res.status(200).json(response);
  } catch (error) {
    const customError = new CustomError(ERRORS.INTERNAL_SERVER_ERROR.message, ERRORS.INTERNAL_SERVER_ERROR.status);
    req.logger.error(customError)
    res.status(customError.status).json({ error: customError.message });
  }
});


routerProducts.post('/edit/:pid/edited', checkUserRole,  async (req, res) => {
  try {
    const updatedProduct = req.body;
    const { pid } = req.params;
    const response = await productController.updateProductById(pid, updatedProduct);
    res.status(200).redirect('/products/' + pid);
  } catch (error) {
    /* const customError = new CustomError(ERRORS.INTERNAL_SERVER_ERROR.message, ERRORS.INTERNAL_SERVER_ERROR.status);
    req.logger.error(customError)
    res.status(customError.status).json({ error: customError.message }); */
  }
});


routerProducts.post('/edit/:pid', checkUserRole,  async (req, res) => {
  const {pid} = req.params
  const productToEdit = await Product.findById(pid)
  res.render('new-product', {editMode: true, product: productToEdit, user: req.user})
});


module.exports = routerProducts;
