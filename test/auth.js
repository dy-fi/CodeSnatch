var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../app");
var should = chai.should();

chai.use(chaiHttp);
var agent = chai.request.agent(server);

var User = require("../models/user");

describe("User", function() {
    
    // test unsuccessful login
    it("should not be able to login if they have not registered", done => {
        agent.post("/login", { username: "wrong", password: "nope" })
            .end(function(err, res) {
                res.status.should.be.equal(401);
                done();
            });
    });

    // signup
    it("should be able to signup", done => {
        User.findOneAndRemove({ username: "testone" }, function() {
            agent
            .post("/sign-up")
            .send({ username: "testone", password: "password" })
            .end(function(err, res) {
                console.log(res.body);
                res.should.have.status(200);
                done();
            });
        });
    });

    // logout
    it("should be able to logout", done => {
        agent.get("/logout").end(function(err, res) {
            res.should.have.status(200);
            done();
        });
    });

    // test successful login
    before(done => {
        agent
        .post("/login")
        .send({ username: "testone", password: "password" })
        .end(function(err, res) {
            done();
        });
    });
});
