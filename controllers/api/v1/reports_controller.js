const Doctor = require("../../../models/Doctor");
const Patient = require("../../../models/Patient");
const Report = require("../../../models/Report");


// get all reports even logged in using "/reports/:status"
module.exports.reports = async (req, res) => {

    try {

        // store status
        const filter = req.params.status;

        // find all reports
        const reports = await Report
            .find({ status: filter })
            .populate({
                path: "doctor",
                select: "_id username"
            })
            .populate({
                path: "patient",
                select: "_id phone"
            })

        // now it's time to return
        if (reports.length == 0) {
            return res.status(200).json({
                success: true,
                message: "There are currently no records in the database"
            })
        }

        // if there are records
        res.status(200).json({
            reportsFound: reports.length,
            reports: reports
        })


    } catch{
        (err) => {
            console.log("Error fetching all reports :: ", err);
            res.status(500).json({
                error: err
            })
        }
    }

}
