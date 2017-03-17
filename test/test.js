process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let User = require("../models/user");

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe('Register User', () => {
    describe('/POST user', () => {
        it('it should not POST a user without admin field', (done) => {
            let user1 = {
                name: "The Lord of the Rings",
                password: "J.R.R. Tolkien"
            }
            chai.request(server)
                .post('/register')
                .send(user1)
                .end((err, res) => {
                    res.should.have.status(206);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.should.have.property('admin');
                    res.body.errors.admin.should.have.property('kind').eql('required');
                done();
                });
        });

    });
});

describe('Jwt Token', () => {
    describe('/POST login', () => {
        it('it should not return a token with wrong username', (done) => {
            let user = {
                name: "The Lord of the Rings",
                password: "J.R.R. Tolkien"
            }
            chai.request(server)
                .post('/authenticate')
                .send(user)
                .end((err, res) => {
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(false);
                    res.body.should.have.property('message').eql("Authentication failed. User not found.");
                done();
                });
        });

        it('it should not return a token with wrong password', (done) => {
            let user = {
                name: "John Cena",
                password: "J.R.R. Tolkien"
            }
            chai.request(server)
                .post('/authenticate')
                .send(user)
                .end((err, res) => {
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(false);
                    res.body.should.have.property('message').eql("Authentication failed. Wrong password.");
                done();
                });
        });

    });
    
});