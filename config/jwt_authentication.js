const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        // split beared token to bearer and token
        const token = req.headers.authorization.split(" ")[1];

        console.log(token);

        // verify token
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        console.log(decoded);


        req.userData = decoded;
        next();
    } catch (error) {

        res.status(404).json({
            error: "Authentication failed"
        })

    }
}