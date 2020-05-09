const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
// create doctor schema
const doctorSchema = mongoose.Schema({

    // details
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        validate: validator.isEmail
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }

}, { timeStamps: true })


// securing passwords with bcrypt
doctorSchema.pre("save", async function (next) {

    // generating salt
    const salt = await bcrypt.genSalt(10);
    // creating hash...
    this.password = await bcrypt.hash(this.password, salt);

});


// export schema
module.exports = mongoose.model("Doctor", doctorSchema);