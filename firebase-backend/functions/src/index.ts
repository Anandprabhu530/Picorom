import {initializeApp} from "firebase-admin/app";
import {onCall} from "firebase-functions/v2/https";
import {Storage} from "@google-cloud/storage";
import dotenv from "dotenv";

initializeApp();
dotenv.config();

const storage = new Storage();

const inputBucket = storage.bucket("input-bucket-image-processing");
const outputBucket = storage.bucket("output-bucket-image-processing");
const RETRY_LIMIT = 3; // Number of retry attempts
const RETRY_DELAY = 2000; // Delay between retries in milliseconds

export const callTransformFunction = onCall(
  {cors: [/firebase\.com$/, "http://localhost:5173"]},
  async (request) => {
    const {fileName, coversionType} = request.data;

    // Function to handle retries for transformImage
    const fetchWithRetry = async (
      url: string,
      options: any,
      retries = RETRY_LIMIT
    ) => {
      let attempt = 0;
      while (attempt < retries) {
        try {
          const response = await fetch(url, options);
          if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
          }
          return await response.json();
        } catch (error: any) {
          attempt++;
          if (error.message.includes("503") && attempt < retries) {
            console.log(
              `Attempt ${attempt} failed, retrying in ${RETRY_DELAY}ms...`
            );
            await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
          } else {
            throw error;
          }
        }
      }
      throw new Error("Failed after retries");
    };

    try {
      // Cannot be called from outside. Only internal invocations allowed
      const transformImage = await fetchWithRetry(process.env.URL!, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileName: fileName,
          coversionType: coversionType,
        }),
      });

      // Check the result of the transformation
      if (transformImage.ok) {
        // If transformation is successful, generate signed URL
        const file = outputBucket.file(
          `transform-${fileName}.${coversionType}`
        );
        const [signedUrl] = await file.getSignedUrl({
          action: "read",
          expires: Date.now() + 15 * 60 * 1000, // 15 minutes expiration time
        });
        return signedUrl;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error during image transformation:", error);
      // If all retries failed or any other error occurred, return null
      return null;
    }
  }
);

export const generateUploadURL = onCall(
  {cors: [/firebase\.com$/, "http://localhost:5173"]},
  async (request) => {
    const data = request.data;
    const fileName = `${Date.now()}_${data.fileName}`;
    // Generate a signed URL for the file in the input bucket.
    const [url] = await inputBucket.file(fileName).getSignedUrl({
      version: "v4",
      action: "write",
      // 15 minutes expiration time
      expires: Date.now() + 15 * 60 * 1000,
    });

    // Return the signed URL and the file name to the client.
    return {url, fileName};
  }
);
