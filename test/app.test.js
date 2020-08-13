const app = require("../index");
const chai = require("chai");
const chaiHttp = require("chai-http");

const { expect } = chai;
chai.use(chaiHttp);
describe("Vitals", () => {
    it("get specific vitals with existing ID", done => {
        chai
            .request(app)
            .get("/history/search?vitalsId=20")
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object')
                expect(res.body.vitalsarr).to.be.a('array')
                expect(res.body).to.have.key('vitals')

                done();
            });
    });
    it("get first 20 vitals", done => {
        chai
            .request(app)
            .get("/history/init")
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object')
                expect(res.body.vitalsarr).to.be.a('array')
                expect(res.body).to.have.key('vitals')

                done();
            });

    });
    it("get specific vitals information with not existing ID", done => {
        chai
            .request(app)
            .get("/history/search?vitalsId=3400")
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.be.a('object')
                expect(res.body).to.have.key('error')
                expect(res.body.error).to.equal('no vitals with this id')


                done();
            });

    });


describe("Message", () => {
    it("get all drug information", done => {
        chai
            .request(app)
            .get("/drug")
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object')
                expect(res.body.drugs).to.be.a('array')
                expect(res.body).to.have.key('drugs')

                done();
            });
    });
    it("get all messages of a conversation ", done => {
        chai
            .request(app)
            .get("/message/1/2")
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object')
                expect(res.body.messages).to.be.a('array')
                expect(res.body).to.have.key('messages')

                done();
            });

    });
    it("post message with valid parameters ", done => {
        chai
            .request(app)
            .post("/message/1")
            .send({
                "message": "Hallo",
                "timestamp": "2020-08-11",
                "patientIsReceiver": true,
                "doctorID": 2
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object')
                expect(res.body).to.have.key('status')
                expect(res.body.status).to.equal('created')

                done();
            });

    });
    it("post message with not existing Id`s ", done => {
        chai
            .request(app)
            .post("/message/100000")
            .send({
                "message": "Hallo",
                "timestamp": "2020-08-11",
                "patientIsReceiver": true,
                "doctorID": 2
            })
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.be.a('object')
                expect(res.body).to.have.key('error')
                expect(res.body.error).to.equal('ER_NO_REFERENCED_ROW_2')

                done();
            });

    });


});


