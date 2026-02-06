const Result = require("../models/result");

class TeacherController {

  // ➕ ADD RESULT (Only Teacher)
  static async addResult(req, res) {
    try {
      // 🔐 Role check (IMPORTANT)
      if (req.user.role !== "teacher") {
        return res.status(403).json({ message: "Access denied" });
      }

      const { student, subject, marks } = req.body;

      // 🛑 Basic validation
      if (!student || !subject || !marks) {
        return res.status(400).json({ message: "All fields are required" });
      }

      // 🎯 Grade logic
      let grade;
      if (marks >= 75) grade = "A";
      else if (marks >= 50) grade = "B";
      else grade = "C";

      const result = await Result.create({
        student,
        subject,
        marks,
        grade
      });

      res.status(201).json({
        message: "Result Added Successfully",
        result
      });

    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  }

  // 📊 VIEW ALL RESULTS (Only Teacher)
  static async allResults(req, res) {
    try {
      if (req.user.role !== "teacher") {
        return res.status(403).json({ message: "Access denied" });
      }

      const results = await Result.find()
        .populate("student", "name email");

      res.json(results);

    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  }
}

module.exports = TeacherController;
