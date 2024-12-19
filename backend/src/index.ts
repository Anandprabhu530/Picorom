import express from "express";
import sharp from "sharp";
import {
  deleteFile,
  dir_exists,
  downloadFromBucket,
  uploadToBucket,
} from "./utils";

const app = express();

app.use(express.json());
dir_exists();
const inputDir = "./inputDir";
const outputDir = "./outputDir";

app.post("/transform", async (req, res) => {
  // get the filenaname and conversion type
  const {fileName, coversionType} = req.body;

  // Obtain the filename without extension
  const trimmedFileName = fileName.split(".")[0];

  //download video from google storage
  await downloadFromBucket(fileName);

  //create the input path
  const inputFilePath = `${inputDir}/${fileName}`;

  // create output path to store the converted image
  const outputFilePath = `${outputDir}/transform_${trimmedFileName}.${coversionType}`;

  try {
    // convert filetype
    const data = await sharp(inputFilePath)
      .toFormat(coversionType)
      .toFile(outputFilePath);

    //upload file to Bucket
    await uploadToBucket(`transform_${trimmedFileName}.${coversionType}`);

    // clean up files
    await deleteFile(`./inputDir/${fileName}`);
    await deleteFile(
      `./outputDir/transform_${trimmedFileName}.${coversionType}`
    );

    // respond with 200
    res.status(200).json({message: data});
  } catch (error) {
    // clean up files
    await deleteFile(`./inputDir/${fileName}`);
    await deleteFile(
      `./outputDir/transform_${trimmedFileName}.${coversionType}`
    );
    res.status(500).json({message: error});
  }
});

app.listen(8080, () => {
  console.log("Listening on 8080");
});
