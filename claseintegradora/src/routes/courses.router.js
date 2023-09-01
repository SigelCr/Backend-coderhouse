import { Router } from "express";
import { coursesMongo } from "../managers/courses/CoursesMongo.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const courses = await coursesMongo.findAll();
    res.status(200).json({ message: "courses found", courses });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const course = await coursesMongo.findById(id);
    if (!course) {
      res.status(400).json({ message: "invalid ID" });
    } else {
      res.status(200).json({ message: "course found", course });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post("/", async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "some data is missing error " });
  }
  try {
    const newCourse = await coursesMongo.createOne(req.body);
    res.status(200).json({ message: "course created", user: newCourse });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.delete("/:idCourse/students/:idStudent", async (req, res) => {
  const { idCourse, idStudent } = req.params;
  try {
    const result = await coursesMongo.deleteStudent(idCourse, idStudent);
    res.status(200).json({ message: "Succes perri" });
  } catch (error) {
    res.status(500).json({ error });
  }
});

//router.put('/:d')

//router.delete('/:id')

export default router;
