const express = require("express");
const router = express.Router();
const reportsController = require("../../../controllers/api/v1/reports_controller");
const checkAuth = require("../../../config/jwt_authentication");
// handle all requests
router.get("/:status", checkAuth, reportsController.reports);


// export router
module.exports = router;