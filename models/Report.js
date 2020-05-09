const mongoose = require("mongoose");

// schema
const reportSchema = mongoose.Schema({

    // details
    status: {
        type: String,
        enum: ['Negative', 'Travelled-Quarantine', 'Symptoms-Quarantine', 'Positive-Admit'],
        required: true
    },
    date: {
        type: String,
        required: true
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor"
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient"
    }
}, { timeStamps: true })



// export model
module.exports = mongoose.model("Report", reportSchema);