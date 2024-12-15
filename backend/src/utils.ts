import fs from "fs";

export async function downloadFromBucket(fileName: string) {}

export async function delete_file(fileName: string) {
  return new Promise<void>((resolve, reject) => {
    if (fs.existsSync(fileName)) {
      fs.unlink(fileName, (error) => {
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
