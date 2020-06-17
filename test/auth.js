const { chai, server, should } = require("./testConfig");
const UserModel = require("../models/UserModel");

/**
 * Test cases to test all the authentication APIs
 * Covered Routes:
 * (1) Login
 */

describe("Auth", () => {
	// Before each test we empty the database
	before((done) => {
		UserModel.deleteMany({}, (err) => {
			done();
		});
	});

	// Prepare data for testing
	const testData = {
		firstName: "test",
		lastName: "testing",
		password: "Test@123",
		email: "maitraysuthar@test12345.com",
	};
	/*
	 * Test the /POST route
	 */
	describe("/POST Login", () => {
		it("It should send validation error for Login", (done) => {
			chai
				.request(server)
				.post("/api/auth/login")
				.send({ email: testData.email })
				.end((err, res) => {
					res.should.have.status(400);
					done();
				});
		});
	});

	/*
	 * Test the /POST route
	 */
	describe("/POST Login", () => {
		it("it should Send failed user Login", (done) => {
			chai
				.request(server)
				.post("/api/auth/login")
				.send({ email: "admin@admin.com", password: "1234" })
				.end((err, res) => {
					res.should.have.status(401);
					done();
				});
		});
	});

	/*
	 * Test the /POST route
	 */
	describe("/POST Login", () => {
		it("it should do user Login", (done) => {
			chai
				.request(server)
				.post("/api/auth/login")
				.send({ email: testData.email, password: testData.password })
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.have.property("message").eql("Login Success.");
					done();
				});
		});
	});
});
