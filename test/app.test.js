var expect = require('chai').expect;
var app = require('../app');
var request = require('supertest');
const chai = require("chai");
const chaiHttp = require("chai-http");

// import models
const mongoose = require("mongoose");
const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");
const Report = require("../models/Report");

chai.use(chaiHttp);
chai.should();

//let's set up the data we need to pass to the login method
// while deploying to local machine first create a doctor and use his credentials over here
const userCredentials = {
    username: 'username',
    password: 'password'
}

//now let's login the user before we run any tests
var authenticatedUser = request.agent(app);



let token;
beforeEach(function (done) {
    chai
        .request(app)
        .post('/api/v1/doctors/login')
        .type("form")
        .send(userCredentials)
        .end(function (err, response) {
            expect(response.statusCode).to.equal(200);
            token = response.body.token;

            done();
        });
});
before((done) => {
    Patient.remove({ phone: "9999999999" }, (err) => {
        done();
    });
});

// tests

describe("App", () => {

    let patientId;

    // patients register
    it("/patients/register", done => {

        // patient details
        let patient = {
            phone: "9999999999"
        }

        // call using authenticated user
        // call in this manner only else it won't work
        //checks whether it returns the newly created patient or not
        chai
            .request(app)
            .post(`/api/v1/patients/register`)
            .type("form")
            .send(patient)
            .set({ "Authorization": `Bearer ${token}` })
            .end(
                (err, res) => {

                    patientId = res.body.patient.patientId;

                    // status should be 200
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    expect(res.body.success).to.equals(true);
                    expect(res.body.message).to.equals("patient created successfully");
                    expect(res.body.patient.phone).to.equals(patient.phone);
                    done();
                }
            )


    })

    // check for "/patients/:patientId/create-report"
    it("/patients/:patientid/create_report", (done) => {

        // object to be passes
        let report = {
            status: "Negative"
        }


        chai
            .request(app)
            .post(`/api/v1/patients/${patientId}/create_report`)
            .type("form")
            .send(report)
            .set({ "Authorization": `Bearer ${token}` })
            .end(
                (err, res) => {

                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    expect(res.body.success).to.equals(true);
                    expect(res.body.message).to.equals("Report created successfully");
                    done();
                }
            )


    })

    // //test for "/patients/patientId/all_reports"
    it("/patients/:patientId/all_reports", (done) => {

        chai
            .request(app)
            .post(`/api/v1/patients/${patientId}/all_reports`)
            .set({ "Authorization": `Bearer ${token}` })
            .end(
                (err, res) => {

                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    expect(res.body.success).to.equals(true);
                    expect(res.body.patientId).to.equals(patientId);
                    done();
                }
            )


    })

    // check for "/reports/:status"
    it("/reports/:status", done => {
        let status = "Negative";
        chai
            .request(app)
            .get(`/api/v1/reports/${status}`)
            .set({ "Authorization": `Bearer ${token}` })
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            })
    });


    // all the checks if authentication fails
    it("UnAuthentication check for ==> /patients/register", done => {

        // patient details
        let patient = {
            phone: "9999999999"
        }



        //checks for unauthenticated
        chai
            .request(app)
            .post(`/api/v1/patients/register`)
            .type("form")
            .send(patient)
            .end(
                (err, res) => {
                    // status should be 500
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    expect(res.body.error).to.equals("Authentication failed");
                    done();
                }
            )


    })


    // check for /create/report
    // check for unAuthenticated Error
    it("Check UnAuthenticated for ==> /patients/:patientid/create_report", (done) => {

        // object to be passes
        let report = {
            status: "Negative"
        }


        chai
            .request(app)
            .post(`/api/v1/patients/${patientId}/create_report`)
            .type("form")
            .send(report)
            .end(
                (err, res) => {

                    // status should be 500
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    expect(res.body.error).to.equals("Authentication failed");
                    done();
                }
            )
    })

    // checks if any other conditions are violated
    // check if a doctor tries to re register a patient
    it("Duplicate Patient Insertion ==> /patients/register", async done => {

        // patient details
        const patient = await Patient.findById(patientId);
        // create a duplicate id
        let data = {
            phone: patient.phone
        }



        chai
            .request(app)
            .post(`/api/v1/patients/register`)
            .type("form")
            .send(data)
            .set({ "Authorization": `Bearer ${token}` })
            .end(
                (err, res) => {

                    // status should be 500
                    res.should.have.status(500);
                    res.body.should.be.a('object');
                    expect(res.body.message).to.equals("Patient already exist.");

                }
            )


    })


})