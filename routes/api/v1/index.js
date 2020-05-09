const express = require("express");
const router = express.Router();


// handle all requests
router.use("/doctors", require("./doctors"));
router.use("/patients", require("./patients.js"));


// export router
module.exports = router;