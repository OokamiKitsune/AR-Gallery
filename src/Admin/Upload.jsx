import { useEffect } from "react";
import Uppy from "@uppy/core";
import "@uppy/core/dist/style.css";
import Dashboard from "@uppy/dashboard";
import "@uppy/dashboard/dist/style.css";
import Tus from "@uppy/tus";

const Upload = () => {
  useEffect(() => {
    const SUPABASE_ANON_KEY = "";
    const SUPABASE_PROJECT_ID = "";
    const STORAGE_BUCKET = "images";

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
          authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          apikey: SUPABASE_ANON_KEY,
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

    uppy.on("file-added", (file) => {
      const supabaseMetadata = {
        bucketName: STORAGE_BUCKET,
        objectName: folder ? `${folder}/${file.name}` : file.name,
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
