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

const DiseaseMatrixContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 2rem;
`;

const DiseaseMatrix = styled.table`
  border-collapse: collapse;
  margin: 1rem;
  font-size: 1rem;
  text-align: center;
  background-color: #222; /* Dark table background */
  border: 1px solid #444; /* Border color for contrast */
  width: 250px;

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

function DiseaseConfusionMatrix({ csvFilePath }) {
  const [diseaseMatrix, setDiseaseMatrix] = useState({});
  const [diseases, setDiseases] = useState([]);

  useEffect(() => {
    // Fetch the CSV file dynamically based on the passed path
    fetch(csvFilePath)
      .then((res) => res.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const matrix = calculateDiseaseMatrix(results.data);
            setDiseaseMatrix(matrix);
            setDiseases(Object.keys(matrix)); // Set unique disease labels
          },
        });
      });
  }, [csvFilePath]);

  // Function to calculate disease-specific confusion matrices
  const calculateDiseaseMatrix = (data) => {
    const diseaseConfusion = {};

    // Iterate through each row and calculate confusion matrix for each disease
    data.forEach((row) => {
      const actual = row.actual_labels.split(",");
      const predicted = row.predicted_labels.split(",");

      const allLabels = [...new Set([...actual, ...predicted])];

      allLabels.forEach((label) => {
        if (!diseaseConfusion[label]) {
          diseaseConfusion[label] = { TP: 0, TN: 0, FP: 0, FN: 0 };
        }

        const actualHasLabel = actual.includes(label);
        const predictedHasLabel = predicted.includes(label);

        if (actualHasLabel && predictedHasLabel) {
          diseaseConfusion[label].TP += 1; // True Positive
        } else if (!actualHasLabel && predictedHasLabel) {
          diseaseConfusion[label].FP += 1; // False Positive
        } else if (actualHasLabel && !predictedHasLabel) {
          diseaseConfusion[label].FN += 1; // False Negative
        } else {
          diseaseConfusion[label].TN += 1; // True Negative
        }
      });
    });

    return diseaseConfusion;
  };

  return (
    <Container>
      <Title>Retinal Disease Confusion Matrices</Title>

      <DiseaseMatrixContainer>
        {diseases.map((disease) => (
          <DiseaseMatrix key={disease}>
            <thead>
              <tr>
                <th>{disease}</th>
                <th>Predicted: 0</th>
                <th>Predicted: 1</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Actual: 0</th>
                <td
                  className={diseaseMatrix[disease].TN > 0 ? "highlight" : ""}
                >
                  {diseaseMatrix[disease].TN}
                </td>
                <td className={diseaseMatrix[disease].FP > 0 ? "mismatch" : ""}>
                  {diseaseMatrix[disease].FP}
                </td>
              </tr>
              <tr>
                <th>Actual: 1</th>
                <td className={diseaseMatrix[disease].FN > 0 ? "mismatch" : ""}>
                  {diseaseMatrix[disease].FN}
                </td>
                <td
                  className={diseaseMatrix[disease].TP > 0 ? "highlight" : ""}
                >
                  {diseaseMatrix[disease].TP}
                </td>
              </tr>
            </tbody>
          </DiseaseMatrix>
        ))}
      </DiseaseMatrixContainer>
    </Container>
  );
}

export default DiseaseConfusionMatrix;
