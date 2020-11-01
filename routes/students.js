const express = require("express");
const router = express.Router();

const studentDAO = require("../daos/students.dao");

// Get all
router.get("/students", async (req, res) => {
  const students = await studentDAO.getAllStudents();
  res.json({ students });
});

router.post("/students/add", async (req, res) => {
  const student = {
    student_id: req.body.studentId,
    name: req.body.name,
    birthdate: req.body.birthdate,
  };
  const success = await studentDAO.addStudent(student);
  console.log("success", success);
  if (success) {
    res.redirect("/");
  } else {
    res.status(400).send("Invalid");
  }
});

router.get("/students/delete/:id", async (req, res) => {
  const student_id = req.params.id;
  const success = await studentDAO.deleteStudent(student_id);
  if (success) {
    res.redirect("/");
  }
  if (!success) res.status(400).send("invalid");
});

module.exports = router;
