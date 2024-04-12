require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const adRoutes = require("./routes/ads");
const userRoutes = require("./routes/user");

const app = express();

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  // dev only
  console.log(req.path, req.method);
  next();
});

app.use("/api/ads", adRoutes);
app.use("/api/user", userRoutes);

mongoose
  .connect(process.env.MONG_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Connected and listening on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
