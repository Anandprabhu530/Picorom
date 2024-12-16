import express from "express";
import path from "path";
import sharp from "sharp";
import {deleteFile, downloadFromBucket, uploadToBucket} from "./utils";

const app = express();

app.use(express.json());

app.get("/transform", async (req, res) => {
  const {fileName, coversionType} = req.body;
  const trimmedFileName = fileName.split(".");

  //download video from google storage
  await downloadFromBucket(fileName);

  const inputFilePath = path.resolve(__dirname, ".", "inputDir", fileName);

  const outputFilePath = path.resolve(
    __dirname,
    ".",
    "outputDir",
    `${trimmedFileName[0]}.${coversionType}`
  );
  try {
    // convert filetype
    const data = await sharp(inputFilePath)
      .toFormat(coversionType)
      .toFile(outputFilePath);

    //upload file to Bucket
    await uploadToBucket(`trimmedFileName[0].${coversionType}`);

    // clean up files
    await deleteFile(`./inputDir/${fileName}`);
    await deleteFile(`./outputDir/${trimmedFileName[0]}.${coversionType}`);

    res.status(200).json({message: data});
  } catch (error) {
    // clean up files
    await deleteFile(`./inputDir/${fileName}`);
    await deleteFile(`./outputDir/${trimmedFileName[0]}.${coversionType}`);

    res.status(500).json({message: null});
  }
});

app.listen(6969);
