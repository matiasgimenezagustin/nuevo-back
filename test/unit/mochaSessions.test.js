const supertest = require('supertest');
const chai = require('chai');

const bcrypt = require('bcrypt');
const User = require('../../dao/models/user');
const Cart = require('../../dao/models/cart');
const app = require('../../app');

chai.use(require('chai-as-promised'));
const expect = chai.expect;
const request = supertest(app);

describe('Registration Endpoint', () => {
  beforeEach(async () => {
    // Limpia la base de datos antes de cada prueba
    await User.deleteMany({});
    await Cart.deleteMany({});
  });

  it('should successfully register a new user', async () => {
    const userData = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.does@example.com',
      age: 25,
      password: 'password123',
    };

    const response = await request
      .post('/register')
      .send(userData)
      .expect(302); 


    expect(response.header.location).to.equal('/products');


    const user = await User.findOne({ email: userData.email });
    expect(user).to.exist;
    expect(user.first_name).to.equal(userData.first_name);
    expect(user.last_name).to.equal(userData.last_name);
    expect(user.age).to.equal(userData.age);


    const isPasswordValid = await bcrypt.compare(userData.password, user.password);
    expect(isPasswordValid).to.be.true;

  
    const cart = await Cart.findOne({ _id: user.cart });
    expect(cart).to.exist;
  });

  it('should handle registration with existing email', async () => {

    const existingUser = new User({
      first_name: 'Jane',
      last_name: 'Doe',
      email: 'jane.doe@example.com',
      age: 30,
      password: 'password456',
    });
    await existingUser.save();

    const userData = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'jane.doe@example.com',  
      age: 25,
      password: 'password789',
    };

    const response = await request
      .post('/register')
      .send(userData)
      .expect(302);  


    const usersAfterRegistrationAttempt = await User.find({});
    expect(usersAfterRegistrationAttempt).to.have.lengthOf(1);
    expect(response.header.location).to.equal('/session/register');  
  });



});
