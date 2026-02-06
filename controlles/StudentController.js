const Result = require("../models/result");

class StudentController {

    // 📘 Student apna result dekhega
    static async myResults(req, res) {
        try {
            //   // 🔐 Role check
            console.log(req.user)
            if (req.user.role !== "user") {
                return res.status(403).json({ message: "Access denied" });
            }

            const results = await Result.find({
                student: req.user.id
            });

            res.json(results);

        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Server error", error });
        }
    }
}

module.exports = StudentController;
