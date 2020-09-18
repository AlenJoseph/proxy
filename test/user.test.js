let chai = require('chai');
const serverUrl = 'http://localhost:3000';
chai.config.includeStack = true;
let chaiHttp = require('chai-http');
chai.use(chaiHttp);


//User Test
describe('For Users Test  API', () => {
  it('Should return it works ', function(done) {
    chai
      .request(serverUrl)
      .get('/')
      .end((err, res) => {
        res.status.should.be.equal(200);
        done();
      });
  });
});