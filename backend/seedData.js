const User = require("./models/users");
const Employee = require("./models/employee");

const sampleUsers = [
  {
    username: "johndoe",
    email: "johndoe@example.com",
    password: "password123",
  },
  {
    username: "janedoe",
    email: "janedoe@example.com",
    password: "password123",
  },
];

const sampleEmployees = [
  {
    first_name: "Alice",
    last_name: "Johnson",
    email: "alice.johnson@example.com",
    position: "Designer",
    salary: 85000,
    date_of_joining: new Date("2023-08-10T00:00:00.000Z"),
    department: "Design",
  },
  {
    first_name: "Bob",
    last_name: "Smith",
    email: "bob.smith@example.com",
    position: "Developer",
    salary: 90000,
    date_of_joining: new Date("2023-08-01T00:00:00.000Z"),
    department: "Development",
  },
];

async function seedData() {
  try {
    console.log("Starting database seeding...");

    // Insert sample users if they do not exist
    for (const user of sampleUsers) {
      console.log(`Checking user: ${user.email}`);
      const existingUser = await User.findOne({ email: user.email });

      if (!existingUser) {
        console.log(`Creating user: ${user.username}`);
        const newUser = new User(user);
        await newUser.save();
        console.log(`User created: ${user.username}`);
      } else {
        console.log(`User already exists: ${user.username}`);
      }
    }

    // Insert sample employees if they do not exist
    for (const employee of sampleEmployees) {
      console.log(`Checking employee: ${employee.email}`);
      const existingEmployee = await Employee.findOne({
        email: employee.email,
      });

      if (!existingEmployee) {
        console.log(
          `Creating employee: ${employee.first_name} ${employee.last_name}`
        );
        const newEmployee = new Employee(employee);
        await newEmployee.save();
        console.log(
          `Employee created: ${employee.first_name} ${employee.last_name}`
        );
      } else {
        console.log(
          `Employee already exists: ${employee.first_name} ${employee.last_name}`
        );
      }
    }

    console.log("Database seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding data:", error);
  }
}

module.exports = seedData;
