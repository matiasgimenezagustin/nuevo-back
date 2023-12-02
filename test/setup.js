const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

global.expect = chai.expect;

