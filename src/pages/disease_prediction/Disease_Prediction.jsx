import React, { useState } from "react";
import Disease_Pred_test from "../../components/Disease_Pred_test";

function Disease_Prediction() {
  const [selectedSet, setSelectedSet] = useState("test"); // "test" or "evaluation"

  // Define file paths for evaluation and test sets
  const paths = {
    test: {
      csvFilePath: "/csv_files/multiple_predictions_test_final.csv",
      imageDirPath: "/assets/retinal_images_test",
    },
    evaluation: {
      csvFilePath: "/csv_files/multiple_predictions_val_final.csv",
      imageDirPath: "/assets/retinal_images_val",
    },
  };

  // Update paths based on selected set
  const { csvFilePath, imageDirPath } = paths[selectedSet];

  return (
    <div>
      {/* Dropdown for selecting the evaluation set */}
      <div>
        <label>Select Set: </label>
        <select
          value={selectedSet}
          onChange={(e) => setSelectedSet(e.target.value)}
        >
          <option value='test'>Test Set</option>
          <option value='evaluation'>Evaluation Set</option>
        </select>
      </div>

      {/* Pass the selected paths as props to Disease_Pred_test */}
      <Disease_Pred_test
        csvFilePath={csvFilePath}
        imageDirPath={imageDirPath}
      />
    </div>
  );
}

export default Disease_Prediction;
