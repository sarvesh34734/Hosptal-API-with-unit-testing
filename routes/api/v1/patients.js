const express = require("express");
const router = express.Router();
const patientsController = require("../../../controllers/api/v1/patients_controller");
const checkAuth = require("../../../config/jwt_authentication");

// handle all requests
router.post("/register", checkAuth, patientsController.registerPatient);
router.post("/:patientId/create_report", checkAuth, patientsController.createReport);
router.post("/:patientId/all_reports", checkAuth, patientsController.allReports);
// export router
module.exports = router;