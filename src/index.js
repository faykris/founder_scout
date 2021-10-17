import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from "./routes/co_founder";

dotenv.config();
const app = express();
const port = process.env.PORT || 9000;


// middleware
app.use(express.json());
app.use("/api/v1", router);


// routes
app.get("/", (req, res) => {
  res.send("Welcome to the API")
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((error) => console.error(error));
app.listen(port, () => console.log('server listening on port: ', port));
