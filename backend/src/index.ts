import express from "express";

const app = express();

app.use(express.json());

app.get("/transform", (req, res) => {
  console.log("Request Received");
  res.status(200).json({server: "All good"});
});

app.listen(6969);
