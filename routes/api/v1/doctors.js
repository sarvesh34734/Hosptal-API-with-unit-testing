const express = require("express");
const router = express.Router();
const doctorsController = require("../../../controllers/api/v1/doctors_controller");

// handle all requests
router.post("/register", doctorsController.register);
router.post("/login", doctorsController.login);

// export router
module.exports = router;