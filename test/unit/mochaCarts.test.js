const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');



const Cart = require('../../dao/models/cart');
const app = require('../../app');


chai.use(chaiHttp);
const expect = chai.expect;

describe('Cart Router', () => {

  let testCartId;

  before(async () => {
    try {
      const product1Id = mongoose.Types.ObjectId();
      const product2Id = mongoose.Types.ObjectId();

      const testCart = await Cart.create({
        products: [
          { id: product1Id, quantity: 2 },
          { id: product2Id, quantity: 1 },
        ],
      });

      testCartId = testCart._id;
    } catch (error) {
      console.error('Error creating test cart:', error.message);
      throw error;
    }
  });


  after(async () => {
    try {

      await Cart.deleteOne({ _id: testCartId });
    } catch (error) {
      console.error('Error cleaning up test cart:', error.message);
      throw error;
    }
  });

  it('should render the cart page for authenticated user', async () => {
    try {
      const res = await chai.request(app)
        .get('/api/cart')
        .send();

      expect(res).to.have.status(200);
      expect(res.text).to.include('/api/cart');
      expect(res.body.user).to.be.an('object');
      expect(res.body.cart).to.be.an('object');
      expect(res.body.cart.products).to.be.an('array');
    } catch (error) {
      console.error('Error in test should render the cart page for authenticated user:', error.message);
      throw error;
    }
  });

  it('should return an error for unauthenticated user', async () => {
    try {
      const res = await chai.request(app)
        .get('/api/cart')
        .send();

      expect(res).to.have.status(401);
      expect(res.body).to.deep.equal({ error: 'Unauthorized' });
    } catch (error) {
      console.error('Error in test should return an error for unauthenticated user:', error.message);
      throw error; 
    }
  });

 
});
