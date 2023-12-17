const Product = require("../models/product");
const productRepository = require("../repositories/productRepository");


const getProducts = async (req, res) => {
  try {
    const { limit = 10, page = 1, sort } = req.query;
    const skip = (page - 1) * limit;
    const totalProducts = await Product.countDocuments();
    const totalPages = Math.ceil(totalProducts / limit);
    const products = await Product.find({})
      .skip(skip)
      .limit(parseInt(limit))
      .sort(sort === 'asc' ? 'price' : sort === 'desc' ? '-price' : null);

    const pagination = {
      totalPages,
      prevPage: page > 1 ? page - 1 : null,
      nextPage: page < totalPages ? page + 1 : null,
      page: page,
      hasPrevPage: page > 1,
      hasNextPage: page < totalPages,
    };

    // Verifica si req.user está definido antes de acceder a req.user.role
    const isUser = req.user && req.user.role === 'usuario';

    // Devuelve una respuesta JSON consistente
    res.render('home', {
      products,   // Asegúrate de incluir 'products' en la respuesta JSON
      pagination,
      user: req.user,
      isUser,
    });

  } catch (error) {
    console.error('Error al obtener productos:', error);

    // Renderiza una vista de error con un mensaje específico del error
    res.status(500).json({ error: `Error interno del servidor: ${error.message}` });
  }
};


const verifyStock = async () =>{
  
}




// Crear un nuevo producto
const createProduct = async (productData) => {
    return await productRepository.createProduct(productData);
}

// Eliminar un producto por su ID
const deleteProduct = async (productId) => {
    return await productRepository.deleteProduct(productId);
}

// Obtener un producto por su ID
const getProductById = async (productId) => {
    return await productRepository.getProductById(productId);
}

/* // Obtener todos los productos
const getProducts = async () => {
    return await productRepository.getProducts();
} */

// Actualizar el stock de un producto por su ID
const updateStockProduct = async (productId, stock) => {
    return await productRepository.updateStockProduct(productId, stock);
}

module.exports = {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateStockProduct,
};
