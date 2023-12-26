import { useEffect } from "react";
import Uppy from "@uppy/core";
import "@uppy/core/dist/style.css";
import Dashboard from "@uppy/dashboard";
import "@uppy/dashboard/dist/style.css";
import Tus from "@uppy/tus";
import { v4 as uuidv4 } from "uuid";

// To-do: Call the backend API to get the secret API key
const SECRET_API_KEY = "";
const SUPABASE_PROJECT_ID = "";
const STORAGE_BUCKET = "";

const Upload = () => {
  useEffect(() => {
    const folder = "test";
    const supabaseStorageURL = `https://${SUPABASE_PROJECT_ID}.supabase.co/storage/v1/upload/resumable`;

    const uppy = new Uppy({
      meta: { folder },
      restrictions: { maxNumberOfFiles: 10 },
      autoProceed: true,
    })
      .use(Dashboard, {
        inline: true,
        target: "#drag-drop-area",
        showProgressDetails: true,
      })
      .use(Tus, {
        endpoint: supabaseStorageURL,
        headers: {
          authorization: `Bearer ${SECRET_API_KEY}`,
          apikey: SECRET_API_KEY,
        },
        uploadDataDuringCreation: true,
        chunkSize: 6 * 1024 * 1024,
        allowedMetaFields: [
          "bucketName",
          "objectName",
          "contentType",
          "cacheControl",
        ],
        onError: function (error) {
          console.log("Failed because: " + error);
        },
      });

    // Generate a unique name for the file
    const generateUniqueName = (file) => {
      const uniqueID = uuidv4();
      const fileExtension = file.name.split(".").pop();
      const fileName = file.name.split(".").slice(0, -1).join(".");
      const uniqueFileName = `${fileName}_${uniqueID}.${fileExtension}`;
      console.log("uniqueFileName", uniqueFileName);
      return uniqueFileName;
    };

    uppy.on("file-added", (file) => {
      // Invoke the generateUniqueName function to generate a unique name for the file
      const uniqueFileName = generateUniqueName(file);
      console.log("file added", file);

      const supabaseMetadata = {
        bucketName: STORAGE_BUCKET,
        objectName: folder ? `${folder}/${uniqueFileName}` : uniqueFileName,
        contentType: file.type,
      };

      file.meta = {
        ...file.meta,
        ...supabaseMetadata,
      };

      console.log("file added", file);
    });

    uppy.on("complete", (result) => {
      console.log(
        "Upload complete! We’ve uploaded these files:",
        result.successful
      );
    });

    return () => {
      uppy.close(); // Clean up Uppy instance
    };
  }, []);

  return <div id="drag-drop-area"></div>;
};

export default Upload;
