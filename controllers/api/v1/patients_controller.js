const Patient = require("../../../models/Patient");
const Report = require("../../../models/Report");
const Doctor = require("../../../models/Doctor");
// register a patient
module.exports.registerPatient = async (req, res) => {

    try {

        // check if a patient is already there
        const patient = await Patient.findOne({ phone: req.body.phone });

        // if patient is found return
        if (patient) {
            return res.status(500).json({
                success: false,
                message: "Patient already exist."
            })
        }

        // check if the phone number is a legitimate one
        const reqFormat = /^\d{10}$/;
        // if phne number do not match required format return
        if (!req.body.phone.match(reqFormat)) {

            return res.status(500).json({
                success: false,
                message: "Please enter a valid phone number"
            })
        }

        // if not found then create one
        const patientDCreated = await Patient.create(req.body);
        // return response 
        res.status(200).json({
            success: true,
            message: "patient created successfully",
            patient: {
                phone: patientDCreated.phone,
                patientId: patientDCreated._id
            }
        })


    } catch{

        (err) => {
            console.log("Error in registering patient :: ", err);
            // return error in response
            res.status(500).json({
                message: "Error registering patient",
                error: err
            })
        }
    }

}


// create report of patient using "/api/v1/patient/:patientId/create_report"
module.exports.createReport = async (req, res) => {

    try {

        // store id somewhere
        const patientId = req.params.patientId;

        // look for the patientId in database
        const patient = await Patient.findById(patientId);

        // if no patient is found return
        if (!patient) {
            // return resconsole.log(doctorId)
            return res.status(404).json({
                success: false,
                message: "No patient found with given details. Ask the doctor to register him first"
            })
        }

        // if patient is found
        // check if the status is in desired format
        const statusFormat = ['Negative', 'Travelled-Quarantine', 'Symptoms-Quarantine', 'Positive-Admit'];

        if (!statusFormat.includes(req.body.status)) {
            // return
            return res.status(500).json({
                success: false,
                message: `The status should be of the form ${statusFormat}`
            })
        }

        // if the status is valid
        // create report
        const doctorId = req.userData.userId;

        // find doctor
        const doctor = await Doctor.findById(doctorId);


        // create report
        const report = await Report.create({
            status: req.body.status,
            date: new Date().toJSON().slice(0, 10).toString(),
            doctor: doctor._id,
            patient: patient._id
        })

        // push the report in patients array
        patient.reports.push(report._id);
        // save patient
        patient.save();
        // return response
        res.status(200).json({
            success: true,
            message: "Report created successfully"
        })



    } catch{
        (err) => {
            console.log("Error creating report :: ", err);
            res.status(500).json({
                message: "Error creating report",
                error: err
            })
        }
    }
}


// get all reports of a patient using "/patients/:patientId/all_reports"
module.exports.allReports = async (req, res) => {

    try {

        const patientId = req.params.patientId;

        // check for the patient in database
        const patient = await Patient
            .findById(patientId)
            .sort("-createdAt")
            .populate({
                path: "reports",
                select: "status doctor date"
            })
        // if patient does not exist
        if (!patient) {
            return res.status(404).json({
                success: false,
                message: "No record found. Try registering patient first"
            })
        }

        // if patient is found
        res.status(200).json({
            success: true,
            patientId: patient.id,
            contact: patient.phone,
            reports: patient.reports
        })


    } catch{
        (err) => {
            console.log(`Error in fetching all reports :: `, err);
            res.status(500).json({
                error: err
            })
        }
    }

}