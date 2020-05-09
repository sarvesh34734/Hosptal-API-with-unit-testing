const Doctor = require("../../../models/Doctor");

// register a doctor using router "/api/v1/doctors/register"
module.exports.register = async function (req, res) {

    try {

        // create doctor if he is not there in database

        const doctor = await Doctor.findOne({ username: req.body.username });

        // if doctor is not found
        if (!doctor) {
            // create doctor
            await Doctor.create(req.body);
            //return response
            res.status(200).json({
                success: true,
                message: "Doctor created successfully"
            })

        } else {
            // doctor already exists message
            res.status(500).json({
                message: `Doctor already exists in database. Please login using 'localhost:${process.env.PORT}/api/v1/doctors/login'`
            })
        }
    } catch{
        (err) => {
            console.log("Error in registering doctor :: ", err);
            // return error in response
            res.status(500).json({
                message: "Error registering doctor",
                error: err
            })
        }
    }

}