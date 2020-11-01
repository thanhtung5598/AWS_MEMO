const express = require("express");
const router = express.Router();

const studentDAO = require("../daos/students.dao");

/* GET home page. */
router.get("/", async (req, res) => {
  const students = await studentDAO.getAllStudents();
  res.render("index", { students });
});
module.exports = router;
