const mongoose = require("mongoose");
const validator = require("validator");
// create schema
const patientSchema = new mongoose.Schema({

    // details
    phone: {
        type: "String",
        required: true,
        validate: validator.isMobilePhone
    },
    reports: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Report"
    }]
}, { timestamps: true })

//exporting schema
module.exports = mongoose.model("Patient", patientSchema);