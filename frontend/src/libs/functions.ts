import {getFunctions, httpsCallable} from "firebase/functions";
import {app} from "./firebase";

const functions = getFunctions(app);

const generateUploadURL = httpsCallable(functions, "generateUploadURL");
const callTransformFunction = httpsCallable(functions, "callTransformFunction");

export async function uploadImage(file: File) {
  const coversionType = file.type === "image/jpeg" ? "png" : "jpg";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const response: any = await generateUploadURL({
    fileName: file.name,
  });

  await fetch(response?.data?.url, {
    method: "PUT",
    body: file,
    headers: {
      "Content-Type": file.type,
    },
  });

  const transformImage = await callTransformFunction({
    fileName: response?.data.fileName,
    coversionType: coversionType,
  });

  console.log(transformImage.data);
  return transformImage.data;
}
