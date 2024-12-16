import fs from "fs";
import path from "path";
import {Storage} from "@google-cloud/storage";

const storage = new Storage();

const inputBucket = "input-bucket-image-processing";
const outputBucket = "output-bucket-image-processing";

const inputDir = "./inputDir";
const outputDir = "./outputDir";

export async function downloadFromBucket(fileName: string) {
  try {
    await storage
      .bucket(inputBucket)
      .file(fileName)
      .download({destination: `${inputDir}/${fileName}`});
  } catch (error) {
    console.log(`Error Occured - ${error}`);
  }
}

export async function uploadToBucket(fileName: string) {
  const sourcePath = `${outputDir}/${fileName}`;
  await storage
    .bucket(outputBucket)
    .upload(sourcePath, {destination: fileName});
  console.log(`Processed video uploaded to bucket: ${fileName}`);
}

export async function deleteFile(fileName: string) {
  const currentDir = path.resolve(__dirname, fileName);

  return new Promise<void>((resolve, reject) => {
    if (fs.existsSync(currentDir)) {
      fs.unlink(currentDir, (error) => {
        if (error) {
          console.log(`An error occured ${error?.message}`);
          reject(error);
        } else {
          console.log(`File deleted - ${fileName}`);
          resolve();
        }
      });
    } else {
      console.log(`Skipped... No file found - ${fileName}`);
      resolve();
    }
  });
}
