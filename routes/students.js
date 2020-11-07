var express = require("express");
var router = express.Router();

const studentsDao = require("../daos/students.dao");

// Get all
router.get("/students", async (req, res) => {
  const students = await studentsDao.getAll();
  res.send(students);
});

// Get user by ma_sinhvien
router.get("/students/:id", async (req, res) => {
  const ma_sinhvien = req.params.id;
  const student = await studentsDao.getSingleById(ma_sinhvien);
  if (!student) {
    res.status(400).send({
      error: true,
      message: "student is not exit",
    });
  }
  if (student) {
    res.send(student);
  }
});

// create new user
router.post("/students", async (req, res) => {
  let files = req.files;
  let avatar = await files.avatar;
  const uploadS3 = await studentsDao.uploadAvatar(avatar);

  const student = {
    student_id: req.body.studentId,
    student_name: req.body.name,
    student_birthdate: req.body.birthdate,
    id_lop: req.body.id_lop,
    avatar: uploadS3,
  };
  
  const success = await studentsDao.add(student);
  if (success) {
    res.send("Create Success");
  } else {
    res.status(400).send("Invalid");
  }
});
// update user by ma_sinhvien
router.put('/students/:id', async (req, res) => {
  let files = req.files;
  let avatar = await files.avatar;
  const uploadS3 = await studentsDao.uploadAvatar(avatar);
  const student = {
    student_id: req.params.id,
    student_name: req.body.name,
    student_birthdate: req.body.birthdate,
    avatar: uploadS3,
  };
  const success = await studentsDao.update(student);
  if(success) {
    res.send('Update Success');
  } else {
    res.status(400).send("Invalid")
  }
})
// delete user by ma_sinhvien
router.delete('/students/:id', async (req, res) => {
  const ma_sinhvien = req.params.id;
  const success = await studentsDao.delete(ma_sinhvien);
  if(success) {
    res.send('Delete Success');
  } else {
    res.status(400).send("Invalid")
  }
})

module.exports = router;
