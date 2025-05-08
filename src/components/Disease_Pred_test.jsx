import React, { useState, useEffect } from "react";
import ImagePredictionSwiper from "./ImagePredictionViewer";
import LabelCountViewer from "./Diseases_Counter";
import DiseaseConfusionMatrix from "./Diseases_Confusion_Matrix";

function Disease_Pred_test({ csvFilePath, imageDirPath }) {
  const [loading, setLoading] = useState(true);

  // Simulate loading process with a timeout
  useEffect(() => {
    const loadFiles = async () => {
      try {
        // Simulate file loading (you can replace this with actual fetch requests)
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Simulate a 3-second delay
        setLoading(false); // Set loading to false once files are loaded
      } catch (error) {
        console.error("Error loading files", error);
        setLoading(false); // In case of error, stop the loader
      }
    };
    loadFiles();
  }, [csvFilePath, imageDirPath]);

  if (loading) {
    return (
      <div className="loader">
        {/* Add a loader spinner */}
        <p>Loading...</p>
        {/* You can also use a spinner here, such as a CSS spinner */}
      </div>
    );
  }

  return (
    <div>
      <ImagePredictionSwiper
        csvFilePath={csvFilePath}
        imageDirPath={imageDirPath}
      />

      <div>
        <LabelCountViewer csvFilePath={csvFilePath} />
      </div>

      <div>
        <DiseaseConfusionMatrix csvFilePath={csvFilePath} />
      </div>
    </div>
  );
}

export default Disease_Pred_test;
