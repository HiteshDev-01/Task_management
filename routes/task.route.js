import express from "express";
import {
  createTask,
  deleteTask,
  editTask,
  getAllTask,
  getTasksByCategory,
} from "../controllers/task.controller.js";

const router = express.Router();

router.route("/create").post(createTask);

router.route("/edit/:id").put(editTask);

router.route("/getTasks").get(getAllTask);

router.route("/getTasks/:category").get(getTasksByCategory);

router.route("/deleteTask/:id").delete(deleteTask);

export default router;
