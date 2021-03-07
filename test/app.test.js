
let mongoose = require("mongoose");
let Project = require('../models/company.model');
let User = require('../models/user.model');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();


chai.use(chaiHttp);

describe('Project', () => {
  let userID;
  let userName;
  let projectID;

    beforeEach((done) => {
      Project.remove({}, (err) => {
            done();
        });
    });
  describe('register and auth', () => {
    const testUser = {
      username: "Test",
      email: "dimatest@gmail.com",
      password: "qwertyy",
    };
    it('it should register new user (/POST)', (done) => {
      chai.request(server)
        .post('/api/auth/register')
        .send(testUser)
        .end((err, res) => {
          userID = res.body.local.userID;
          userName = res.body.local.userName;
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.local.should.have.property('userID');
          res.body.local.should.have.property('userName').eql(testUser.username);
          res.body.local.should.have.property('email').eql(testUser.email);
          res.body.local.should.have.property('password');
          done();
        });
    });
    it('it should register new user with the same email (/POST)', (done) => {
      chai.request(server)
        .post('/api/auth/register')
        .send(testUser)
        .end((err, res) => {
          res.should.have.status(422);
          done();
        });
    });
    it('it should auth (/POST)', (done) => {
      const testUser = {
        username: "Test",
        email: "dimatest@gmail.com",
        password: "qwertyy",
      };
      chai.request(server)
        .post('/api/auth/authenticate')
        .send({ email: testUser.email, password: testUser.password })
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

    describe('Get all projects', () => {
        it('it should get empty list of projects (/GET)', (done) => {
            chai.request(server)
              .get('/api/projects')
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(0);
                  done();
              });
        });
    });
  describe('Add new project to list of all projects, get and delete it', () => {
    const testProject = {
      name: "Test music project",
      description: "Test description",
      category: "Music",
      location: "Minsk",
      donateGoal: 123,
      duration: 50,
    }
    it('it should create and return new project (/POST)', (done) => {
      chai.request(server)
        .post('/api/projects')
        .send({userID,userName,...testProject})
        .end((err, res) => {
          res.should.have.status(200);
          projectID = +res.body.projectID;
          res.body.should.have.property('userID');
          res.body.should.have.property('userName').eql(userName);
          res.body.should.have.property('name').eql(testProject.name);
          res.body.should.have.property('description').eql(testProject.description);
          res.body.should.have.property('category').eql(testProject.category);
          res.body.should.have.property('location').eql(testProject.location);
          res.body.should.have.property('donateGoal').eql(testProject.donateGoal);
          res.body.should.have.property('duration').eql(testProject.duration);
          done();
        });
    });
    it('it should DELETE project by id', (done) => {
      chai.request(server)
        .delete('/api/projects')
        .send({projectID})
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

});
