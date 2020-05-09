const express = require("express");
const router = express.Router();
const reportsController = require("../../../controllers/api/v1/reports_controller");

// handle all requests
router.get("/:status", reportsController.reports);


// export router
module.exports = router;