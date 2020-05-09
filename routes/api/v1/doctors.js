const express = require("express");
const router = express.Router();
const doctorsController = require("../../../controllers/api/v1/doctors_controller");

// handle all requests
router.use("/register", doctorsController.register);


// export router
module.exports = router;