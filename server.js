const express = require("express");
const app = express();
require("dotenv").config();

let dbConnect = require("./dbConnect");

app.use(express.json());

const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to my MongoDB application" });
});

const PORT = process.env.PORT || 8180;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
