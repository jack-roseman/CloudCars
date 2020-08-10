let chai = require("chai");
let chaiHttp = require("chai-http");

let server = require("../server");

//assertion style: should
chai.should();

chai.use(chaiHttp);

let dummyVehicle = {
  owner: "Waymo",
  make: "Ford",
  model: "Escape",
  year: "2017",
};

describe("Vehicles API", () => {
  /**
   *TEST GET api/vehicles/all
   */
  describe("GET /api/vehicles/all", () => {
    it("It should return all vehicles", (done) => {
      chai
        .request(server)
        .get("/api/vehicles/all")
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          done();
        });
    });
  });

  /**
   *TEST POST api/partners
   */
  describe("POST /api/vehicles", () => {
    it("It should return created vehicle", (done) => {
      chai
        .request(server)
        .post("/api/vehicles")
        .send(dummyVehicle)
        .end((error, res) => {
          res.body.should.be.a("object");
          res.body.should.have.property("owner").eq(dummyVehicle.owner);
          res.body.should.have.property("make").eq(dummyVehicle.make);
          res.body.should.have.property("model").eq(dummyVehicle.model);
          res.body.should.have.property("year").eq(dummyVehicle.year);
          done();
        });
    });
  });
});

let dummyPartner = {
  name: "Atlantic City Car Wash",
  address: "522 N Albany Ave, Atlantic City, NJ 08401",
  serviceTypes: ["interior cleaning"],
};

describe("Partners API", () => {
  /**
   *TEST GET api/partners/all
   */
  describe("GET /api/partners/all", () => {
    it("It should return all partners", (done) => {
      chai
        .request(server)
        .get("/api/partners/all")
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          done();
        });
    });
  });

  /**
   *TEST POST api/partners
   */
  describe("POST /api/partners", () => {
    it("It should return created partner", (done) => {
      chai
        .request(server)
        .post("/api/partners")
        .send(dummyPartner)
        .end((error, res) => {
          res.body.should.be.a("object");
          res.body.should.have.property("name").eq(dummyPartner.name);
          res.body.should.have.property("address");
          res.body.should.have.property("serviceTypes");
          done();
        });
    });
  });
});
