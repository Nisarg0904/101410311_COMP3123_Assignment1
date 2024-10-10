const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRoutes");
const employeeRouter = require("./routes/employeeRoutes");
const seedData = require("./seedData");
require("dotenv").config();
const SERVER_PORT = 3000;

const app = express();
app.use(express.json());

// MongoDB connection string
const mongoURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.2hfg7.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose
  .connect(mongoURI)
  .then(async () => {
    console.log("MongoDB connected");
    await seedData();
  })
  .catch((err) => console.error("Error connecting to MongoDB:", err.message));

// routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/emp", employeeRouter);

app.listen(SERVER_PORT, () => {
  console.log(`Server is running on http://localhost:${SERVER_PORT}`);
});
