const Doctor = require("../../../models/Doctor");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
                message: `Doctor already exists in database. Please login using 'localhost:${port}/api/v1/doctors/login'`
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


// login doctors using "/api/v1/doctors/login"
module.exports.login = async (req, res, next) => {

    try {

        // check if data exist in database
        const doctor = await Doctor.findOne({ username: req.body.username });
        // if doctor does not exist
        if (!doctor) {
            // return response
            return res.status(404).json({
                success: true,
                message: `Data does not exists in database. Try registering first at "localost:${port}/api/v1/doctors/register"`
            })
        }

        // if doctor is found then compare password and generate token
        const isValid = await bcrypt.compare(req.body.password, doctor.password);
        // if the password do not match
        if (!isValid) {
            // return response
            return res.status(500).json({
                success: false,
                message: "Invalid Username/password"
            })
        }

        // if passwords match generate token
        const token = jwt.sign({
            username: doctor.username,
            userId: doctor._id
        }, process.env.JWT_KEY, {
            expiresIn: "1h"
        })

        // return response
        res.status(200).json({
            success: true,
            message: "Authentication successful",
            token: token,
            expiresIn: "1 hour"
        })


    } catch{
        (err) => {
            console.log("Error in signing in :: ", err);
            // return response
            res.status(500).json({
                error: err
            })
        }
    }
} 