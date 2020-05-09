const express = require("express");
const dotenv = require("dotenv").config({ path: "./config/config.env" });
const port = 3000;
const app = express();
const db = require("./config/mongoose");



// set up encoding
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// set up routes
app.use("/", require("./routes"));









// listen to required port
app.listen(port, (err) => {
    // if there is an error
    if (err) {
        console.log("Error starting up the server ", err);
    }
    console.log(`Server is up and running on port :: ${port}`);
})
