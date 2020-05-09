const express = require("express");
const router = express.Router();


// handle all requests
router.use("/doctors", require("./doctors"));


// export router
module.exports = router;