const mongoose = require("mongoose");
const assert = require("assert");
const chai = require("chai");
const chaiHttp = require("chai-http");
let server = require("../index");
let should = chai.should();
chai.use(chaiHttp);
const fs = require("fs");

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

let filename = "Students_details.ods",
  boundary = Math.random();
let file;
describe("CRUD OPERATIONS", () => {
  before(() => {
    mongoose
      .connect("mongodb://localhost/playgrounds", options)
      .then(() => console.log(":: Connected to database"))
      .catch((error) => console.log(":: Couldn't connect to database ", error));
  });
  it("should fetch all files", (done) => {
    chai
      .request(server)
      .get("/api/v1/files/")
      .end((err, result) => {
        result.should.have.status(200);
        file = result.body.data;
        // console.log("Got", result.body.data, "docs");
        done();
      });
  });
  it("should add a file", (done) => {
    chai
      .request(server)
      .post("/api/v1/files/")
      .set("content-type", "application/x-www-form-urlencoded")
      .field("title", "A new title")
      .attach(
        "file",
        fs.readFileSync("/home/uncu/Documents/Students_details.ods"),
        filename
      )
      .end((err, result) => {
        result.should.have.status(201);
        // console.log("Got", result.body);
        done();
      });
  });
  it("should return a single file", (done) => {
    chai
      .request(server)
      .get(`/api/v1/files/${file[0]._id}`)
      .end((err, result) => {
        result.should.have.status(200);
        // console.log("Got", result.body.data);
        done();
      });
  });
  it("should update a file", (done) => {
    chai
      .request(server)
      .put(`/api/v1/files/${file[0]._id}`)
      .set("content-type", "application/x-www-form-urlencoded")
      .field("title", "A updated title")
      .attach(
        "file",
        fs.readFileSync("/home/uncu/Documents/Students_details.ods"),
        filename
      )
      .end((err, result) => {
        result.should.have.status(200);
        // console.log("Got", result.body);
        done();
      });
  });
  it("should delete file", (done) => {
    chai
      .request(server)
      .delete(`/api/v1/files/${file[0]._id}`)
      .end((err, result) => {
        result.should.have.status(200);
        done();
      });
  });
});
