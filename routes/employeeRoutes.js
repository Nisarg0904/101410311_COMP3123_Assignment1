const express = require("express");
const { body, param, query, validationResult } = require("express-validator");
const Employee = require("../employee");
const router = express.Router();

// POST /api/v1/emp/employees
router.post(
  "/employees",
  [
    // Validate and sanitize fields
    body("first_name")
      .notEmpty()
      .withMessage("First name is required")
      .trim()
      .escape(),
    body("last_name")
      .notEmpty()
      .withMessage("Last name is required")
      .trim()
      .escape(),
    body("email").isEmail().withMessage("Invalid email").normalizeEmail(),
    body("position")
      .notEmpty()
      .withMessage("Position is required")
      .trim()
      .escape(),
    body("salary").isNumeric().withMessage("Salary must be a number"),
    body("date_of_joining").isISO8601().withMessage("Invalid date format"),
    body("department")
      .notEmpty()
      .withMessage("Department is required")
      .trim()
      .escape(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      first_name,
      last_name,
      email,
      position,
      salary,
      date_of_joining,
      department,
    } = req.body;

    try {
      const newEmployee = new Employee({
        first_name,
        last_name,
        email,
        position,
        salary,
        date_of_joining,
        department,
      });

      const savedEmployee = await newEmployee.save();

      res.status(201).json({
        message: "Employee created successfully!",
        employee_id: savedEmployee._id,
      });
    } catch (error) {
      console.error("Error creating employee:", error);
      res.status(500).json({ message: "Server error!" });
    }
  }
);

// GET /api/v1/emp/employees
router.get("/employees", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ message: "Server error!" });
  }
});

// GET /api/v1/emp/employees/:id
router.get(
  "/employees/:id",
  [param("id").isMongoId().withMessage("Invalid employee ID")],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const employeeId = req.params.id;

    try {
      const employee = await Employee.findById(employeeId);

      if (!employee) {
        return res.status(404).json({ message: "Employee not found." });
      }

      res.status(200).json(employee);
    } catch (error) {
      console.error("Error retrieving employee:", error);
      res.status(500).json({ message: "Server error!" });
    }
  }
);

// PUT /api/v1/emp/employees/:id
router.put(
  "/employees/:id",
  [
    param("id").isMongoId().withMessage("Invalid employee ID"),
    body("position")
      .optional()
      .notEmpty()
      .withMessage("Position cannot be empty")
      .trim()
      .escape(),
    body("salary")
      .optional()
      .isNumeric()
      .withMessage("Salary must be a number"),
    body("email")
      .optional()
      .isEmail()
      .withMessage("Invalid email")
      .normalizeEmail(),
    body("first_name").optional().trim().escape(),
    body("last_name").optional().trim().escape(),
    body("department").optional().trim().escape(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const employeeId = req.params.id;
    const updateFields = { ...req.body };

    try {
      const updatedEmployee = await Employee.findByIdAndUpdate(
        employeeId,
        updateFields,
        { new: true, runValidators: true }
      );

      if (!updatedEmployee) {
        return res.status(404).json({ message: "Employee not found." });
      }

      res
        .status(200)
        .json({ message: "Employee details updated successfully." });
    } catch (error) {
      console.error("Error updating employee:", error);
      res.status(500).json({ message: "Server error!" });
    }
  }
);

// DELETE /api/v1/emp/employees?eid=64c9e5a3d9f3c1a5c9b4e8a4
router.delete(
  "/employees",
  [query("eid").isMongoId().withMessage("Invalid employee ID")],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const employeeId = req.query.eid;

    try {
      const emp = await Employee.findByIdAndDelete(employeeId);

      if (!emp) {
        return res.status(404).json({ message: "Employee not found!" });
      }

      res.status(200).json({ message: "Employee deleted successfully!" });
    } catch (error) {
      console.error("Error deleting employee:", error);
      res.status(500).json({ message: "Server error!" });
    }
  }
);

module.exports = router;
