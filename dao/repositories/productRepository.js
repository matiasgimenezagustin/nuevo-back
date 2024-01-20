
const Product = require("../models/product");
const User = require("../models/user");



class ProductRepository {
  async updateProductById(productId, updatedProductData) {
    try {
      // Busca el producto por su ID
      const product = await Product.findById(productId);

      if (!product) {
        throw new Error('Producto no encontrado');
      }

      // Actualiza los campos del producto con los datos proporcionados
      Object.assign(product, updatedProductData);

      // Guarda el producto actualizado en la base de datos
      const updatedProduct = await product.save();

      return updatedProduct;
    } catch (error) {
      console.error('Error al actualizar el producto:', error.message);
      throw error; // Propaga el error para manejarlo en la capa superior si es necesario
    }
  }
  async createProduct(productData, userId) {
    try {
      // Verificar si el usuario existe o si tienes sus datos
      const user = await User.findById(userId);
      if (!user) {
          throw new Error('User not found');
      }

      // Crear un nuevo producto con el ID del usuario como propietario
      const newProduct = new Product({
          ...productData,
          owner:  user._id, // Suponiendo que el ID del usuario es suficiente
              // Puedes agregar más detalles del usuario si es necesario
          
      });

      // Guardar el nuevo producto en la base de datos
      const savedProduct = await newProduct.save();
      
      return savedProduct;
  } catch (error) {
      console.error('Error creating product:', error.message);
      throw error;
  }
  }

  async deleteProduct(productId) {
    return await Product.findByIdAndRemove(productId);
  }

  async getProductById(productId) {
    return await Product.findById(productId);
  }

  async getProducts() {
    return await Product.find({});
  }

  async updateStockProduct(productId, stock) {
    return await Product.findByIdAndUpdate(productId, { stock });
  }
}

module.exports = new ProductRepository();
