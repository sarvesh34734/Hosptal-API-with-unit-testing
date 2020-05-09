const Patient = require("../../../models/Patient");


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


// create report of patient using "/api/v1/patient/:id/create_report"
