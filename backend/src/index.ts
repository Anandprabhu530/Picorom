import express from "express";
import path from "path";
import sharp from "sharp";
import {delete_file, downloadFromBucket} from "./utils";

const app = express();

app.use(express.json());

app.get("/transform", async (req, res) => {
  const {fileName, coversionType} = req.body;
  const trimmedFileName = fileName.split(".");

  //download video from google storage
  // await downloadFromBucket(fileName);

  const inputFilePath = path.resolve(__dirname, ".", "inputDir", fileName);

  const outputFilePath = path.resolve(
    __dirname,
    ".",
    "outputDir",
    `${trimmedFileName[0]}.${coversionType}`
  );

  const data = await sharp(inputFilePath)
    .toFormat(coversionType)
    .toFile(outputFilePath);

  await delete_file(inputFilePath);
  await delete_file(`${trimmedFileName[0]}.${coversionType}`);
  res.status(200).json({server: data});
});

app.listen(6969);
