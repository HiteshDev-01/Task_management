import { Task } from "../models/task.model.js";

const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, category, completed } = req.body;

    // Validating the title or description not empty
    if ([title, description].some((item) => item?.trim() === "")) {
      return res.status(400).json({
        success: false,
        message: "title and description are required !",
        data: undefined,
      });
    }

    // Adding task in the tasks collection
    const task = await Task.create({
      title,
      description,
      dueDate,
      category,
      completed,
    });

    // If document not created in the collection
    if (!task) {
      return res.status(500).json({
        success: false,
        message: "Internal server error:: Not able to create document",
        data: undefined,
      });
    }

    // Success response : If task created successfully
    return res.status(200).json({
      success: true,
      message: "Task successfully added.",
      data: task,
    });
  } catch (error) {
    console.error("Error while creating task::" + error.message);
  }
};

const editTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, dueDate, category, completed } = req.body;

    if (id && id !== "") {
      // Check if the task is exist or not
      const task = await Task.findById(id);
      if (!task) {
        return res.status(404).json({
          success: false,
          message: "Task not found !",
          data: undefined,
        });
      }

      // Check if the task is already marked as completed
      if (completed && task.completed) {
        return res.status(200).json({
          success: false,
          message: "Task is already markes as completed",
        });
      }

      // Check if the the field is exist after update it
      task.title = title || task.title;
      task.description = description || task.description;
      task.dueDate = dueDate || task.dueDate;
      task.category = category || task.category;
      task.completed = completed !== undefined ? completed : task.completed;

      await task.save({ validateBeforeSave: true });

      return res.status(200).json({
        success: true,
        message: "Task successfully updated.",
        data: task,
      });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      sucess: false,
      message: "Task is not updated !" + error.message,
      data: undefined,
    });
  }
};

const getAllTask = async (req, res) => {
  try {
    const tasks = await Task.find();
    if (tasks && tasks.length > 0) {
      return res.status(200).json({
        success: true,
        message: "All tasks fetched successfully.",
        data: tasks,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "No tasks availabel !",
        data: undefined,
      });
    }
  } catch (error) {
    console.error("Failed to fetch the tasks :: Internal server error !");
    return res.json({
      success: false,
      message: error.message,
      data: undefined,
    });
  }
};

const getTasksByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    if (category && category !== "") {
      // find all tasks by category
      const tasks = await Task.find({ category });
      if (tasks && tasks.length > 0) {
        return res.json({
          success: true,
          message: `All tasks fetched by category ${category}`,
          data: tasks,
        });
      }
    } else {
      // Handle if no tasks available
      return res.json({
        success: false,
        message: "No tasks availabel",
        data: undefined,
      });
    }
  } catch (error) {
    console.error(error.message);
    return res.json({
      success: false,
      message: error.message,
      data: undefined,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    // If id is given then it delete the task
    if (id && id !== "") {
      const taskToBeDeleted = await Task.findByIdAndDelete(id);
      return res.json({
        success: true,
        message: "Task deleted successfully",
      });
    } else {
      return res.json({
        success: false,
        message: "Id is required !",
      });
    }
  } catch (error) {
    console.error(error.message);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export { createTask, editTask, getAllTask, getTasksByCategory, deleteTask };
