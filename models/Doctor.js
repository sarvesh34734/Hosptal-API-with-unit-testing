const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// create doctor schema
const doctorSchema = mongoose.Schema({

    // details

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