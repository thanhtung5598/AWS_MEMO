const express = require("express");
const router = express.Router();

const studentDAO = require("../daos/students.dao");

/* GET home page. */
router.get("/", async (req, res) => {
  const students = await studentDAO.getAll();
  res.render("index", { students });
});

router.post("/students/add", async (req, res) => {
  let files = req.files;
  let avatar = await files.avatar;
  const uploadS3 = await studentDAO.uploadAvatar(avatar);
  const student = {
    student_id: req.body.studentId,
    name: req.body.name,
    birthdate: req.body.birthdate,
    avatar: uploadS3,
  };

  const success = await studentDAO.add(student);
  if (success) {
    res.redirect("/");
  } else {
    res.status(400).send("Invalid");
  }
});

router.get("/students/delete/:id", async (req, res) => {
  const student_id = req.params.id;
  const success = await studentDAO.delete(student_id);
  if (success) {
    res.redirect("/");
  }
  if (!success) res.status(400).send("invalid");
});

module.exports = router;
