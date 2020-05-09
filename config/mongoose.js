const mongoose = require("mongoose");

// connect to local database
mongoose.connect('mongodb://localhost:27017/hospital_api', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

// display any error
db.on("error", console.error.bind(console, "Error connecting to mongoDB"));


// upon successful connection
db.once('open', () => {
    console.log("successfully connected to mongoDB")
})


module.exports = db;
