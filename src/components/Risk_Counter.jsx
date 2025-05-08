import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import styled from "styled-components";

// Styled Components
const Container = styled.div`
  padding: 2rem;
  font-family: sans-serif;
  background-color: #121212; /* Dark background */
  color: #e0e0e0; /* Light text color */
`;

const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #ffffff; /* White color for title */
`;

const MatrixContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

const Matrix = styled.table`
  border-collapse: collapse;
  margin: 1rem;
  font-size: 1rem;
  text-align: center;
  background-color: #222; /* Dark table background */
  border: 1px solid #444; /* Border color for contrast */

  th,
  td {
    padding: 1rem;
    border: 1px solid #444; /* Border color for the cells */
  }

  th {
    background-color: #333; /* Dark header background */
    color: #fff; /* Light text color */
  }

  td {
    background-color: #2c2c2c; /* Dark background for cells */
    color: #e0e0e0; /* Light text color */
  }

  td.highlight {
    background-color: #3cb371; /* Green for correct prediction */
    color: #ffffff; /* White text for contrast */
  }

  td.mismatch {
    background-color: #ff6347; /* Red for incorrect prediction */
    color: #ffffff; /* White text for contrast */
  }
`;

function ConfusionMatrix({ csvFilePath }) {
  const [confusionMatrix, setConfusionMatrix] = useState({
    TP: 0, // True Positive
    TN: 0, // True Negative
    FP: 0, // False Positive
    FN: 0, // False Negative
  });

  useEffect(() => {
    // Fetch the CSV file dynamically based on the passed path
    fetch(csvFilePath)
      .then((res) => res.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const matrix = calculateConfusionMatrix(results.data);
            setConfusionMatrix(matrix);
          },
        });
      });
  }, [csvFilePath]);

  // Function to calculate confusion matrix
  const calculateConfusionMatrix = (data) => {
    let TP = 0;
    let TN = 0;
    let FP = 0;
    let FN = 0;

    // Iterate through each row and count TP, TN, FP, FN
    data.forEach((row) => {
      const actual = row.actual_label.trim();
      const predicted = row.predicted_label.trim();

      if (actual === "1" && predicted === "1") {
        TP += 1; // True Positive
      } else if (actual === "0" && predicted === "0") {
        TN += 1; // True Negative
      } else if (actual === "0" && predicted === "1") {
        FP += 1; // False Positive
      } else if (actual === "1" && predicted === "0") {
        FN += 1; // False Negative
      }
    });

    return { TP, TN, FP, FN };
  };

  return (
    <Container>
      <Title>Confusion Matrix</Title>

      <MatrixContainer>
        <Matrix>
          <thead>
            <tr>
              <th></th>
              <th>Predicted: 0</th>
              <th>Predicted: 1</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Actual: 0</th>
              <td className={confusionMatrix.TN > 0 ? "highlight" : ""}>
                {confusionMatrix.TN}
              </td>
              <td className={confusionMatrix.FP > 0 ? "mismatch" : ""}>
                {confusionMatrix.FP}
              </td>
            </tr>
            <tr>
              <th>Actual: 1</th>
              <td className={confusionMatrix.FN > 0 ? "mismatch" : ""}>
                {confusionMatrix.FN}
              </td>
              <td className={confusionMatrix.TP > 0 ? "highlight" : ""}>
                {confusionMatrix.TP}
              </td>
            </tr>
          </tbody>
        </Matrix>
      </MatrixContainer>
    </Container>
  );
}

export default ConfusionMatrix;
