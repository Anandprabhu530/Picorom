import {useState, useCallback} from "react";
import {useDropzone, FileRejection, DropzoneOptions} from "react-dropzone";
import {uploadImage} from "../libs/functions";

const UploadImage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [process, setProcess] = useState(false);
  // const [download_url, setDownloadURL] = useState("");

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      if (rejectedFiles.length > 0) {
        setError(
          "File rejected. Please ensure it's an MP4 or MOV file under 30MB."
        );
        setFile(null);
        return;
      }
      const selectedFile = acceptedFiles[0];
      if (selectedFile) {
        setError("");
        setFile(selectedFile);
      }
    },
    []
  );

  const dropzoneOptions: DropzoneOptions = {
    onDrop,
    accept: {
      "image/jpeg": [".jpeg"],
      "image/png": [".png"],
    },
    maxSize: 30 * 1024 * 1024,
  };
  const {getRootProps, getInputProps, isDragActive, open} =
    useDropzone(dropzoneOptions);

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first.");
      return;
    }

    setLoading(true);
    const response = await uploadImage(file);
    console.log(response);
    setLoading(false);
    //add state to process
    setProcess(false);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center h-[90%]">
      <div className="text-3xl font-semibold mb-20">
        Convert PNG to JPEG and vice-versa
      </div>
      <div className="w-[600px] flex items-center relative justify-center h-[180px]">
        <div className="mt-10">
          <div
            {...getRootProps()}
            className="border-2 border-dashed shadow-xl flex items-center justify-center border-gray-500 rounded-lg p-4 text-center cursor-pointer w-[600px] h-[200px]"
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <div className="text-blue-500">Drop the file here ...</div>
            ) : (
              <div className="font-semibold text-lg">
                Drag & drop video file here, or
                <div>
                  <button
                    type="button"
                    className="text-blue-500 underline underline-offset-1"
                    onClick={open}
                  >
                    Upload File
                  </button>
                </div>
              </div>
            )}
          </div>
          {file && (
            <div className="mt-4">
              <div className="text-sm text-gray-600">
                Selected file: {file.name}
              </div>
              <div>
                Will be Converted Into: &nbsp;
                {file.name.split(".")[0] + "."}
                {file.type === "image/jpeg" ? "png" : "jpg"}
              </div>
              <div className="w-full flex items-center justify-center">
                <button
                  onClick={handleUpload}
                  className="mt-2 px-4 py-2 text-lg font-normal bg-black text-white rounded hover:bg-neutral-900 transition duration-200"
                >
                  {loading ? "Uploading" : process ? "Processing" : "Convert"}
                </button>
              </div>
            </div>
          )}
          {error && <div className="mt-2 text-red-500 text-sm">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default UploadImage;