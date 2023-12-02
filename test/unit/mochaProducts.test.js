const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app');
const Product = require('../../dao/models/product');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Products API - GET /products', () => {
  // Antes de ejecutar las pruebas, crea algunos productos de prueba
  before(async () => {
    await Product.create([
      { title: 'Product 1', price: 20, stock: 10, code: '123', description: 'Description 1' },
    ]);
  });

  // Después de ejecutar las pruebas, limpia la base de datos
  after(async () => {
    await Product.deleteMany({});
  });

  it('should get all products with default parameters', async () => {
    try {
      const res = await chai.request(app).get('/products');
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body.products).to.be.an('array');
      expect(res.body.pagination).to.be.an('object');
    } catch (error) {
      console.error('Error in test should get all products with default parameters:', error.message);
      throw error; // Re-lanza el error para que la prueba falle
    }
  });

  it('should get products with custom parameters', async () => {
    try {
      const res = await chai
        .request(app)
        .get('/products')
        .query({ limit: 2, page: 2, sort: 'desc' });

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body.products).to.be.an('array');
      expect(res.body.pagination).to.be.an('object');
    } catch (error) {
      console.error('Error in test should get products with custom parameters:', error.message);
      throw error; // Re-lanza el error para que la prueba falle
    }
  });

  // Agrega más pruebas según sea necesario para cubrir otros casos

});
