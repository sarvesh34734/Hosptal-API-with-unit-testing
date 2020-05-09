const express = require("express");
const dotenv = require("dotenv").config({ path: "./config/config.env" });
const app = express();

















// listen to required port
app.listen(process.env.PORT, (err) => {
    // if there is an error
    if (err) {
        console.log("Error starting up the server ", err);
    }
    console.log(`Server is up and running on port :: ${process.env.PORT}`);
})
