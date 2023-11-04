const productsMock = [];  // Aquí crea tus productos de ejemplo

for (let i = 1; i <= 100; i++) {
  const product = {
    _id: `product_id_${i}`,
    title: `Product ${i}`,
    description: `Description for Product ${i}`,
    price: 10 + i, 
    stock: 100,
  };
  productsMock.push(product);
}

module.exports = { productsMock };
