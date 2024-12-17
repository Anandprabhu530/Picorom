import {getFunctions, httpsCallable} from "firebase/functions";
import {app} from "./firebase";

const functions = getFunctions(app);

const generateUploadURL = httpsCallable(functions, "generateUploadURL");

export async function uploadImage(file: File) {
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
  return response?.data;
}
