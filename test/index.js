const chai = require('chai');
const chaiHTTP = require('chai-http')
const should = chai.should()

chai.use(chaiHTTP)

describe('site', () => {
    it('Should have home page', (done) => {
        chai.request('localhost:3000')
            .get('/')
            .end((err, res) => {
                if (err) {
                    done(err)
                }
                res.status.should.be.equal(200)
                done()
            })
    })
})