const express = require("express");
const db = require("./models/db");
const dotenv = require("dotenv");
dotenv.config({ path: "./dot.env" });
const authRouter = require("./routers/authRouter");
const productRouter = require("./routers/productRouter");

const app = express();
app.use(express.json());
app.use("/auth", authRouter);
app.use("/products", productRouter);

db.authenticate()
  .then(() => {
    db.sync()
      .then(() => console.log("Synced succesfully"))
      .catch((err) => console.log(err));
    app.listen(8080, () => {
      console.log("Server running at http://localhost:8080");
    });
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });
