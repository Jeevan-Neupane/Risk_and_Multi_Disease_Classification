import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import styled from "styled-components";

// Styled Components
const Container = styled.div`
  padding: 2rem;
  font-family: sans-serif;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
`;

const LabelCount = styled.div`
  margin: 1rem 0;
  font-size: 1rem;
  padding: 0.5rem;
  background-color: #000000;
  border-radius: 8px;
`;

const LabelText = styled.p`
  font-size: 1rem;
  margin: 0.5rem 0;
`;

function LabelCountViewer({ csvFilePath }) {
  const [actualLabelCounts, setActualLabelCounts] = useState({});
  const [predictedLabelCounts, setPredictedLabelCounts] = useState({});

  useEffect(() => {
    // Fetch the CSV file dynamically based on the passed path
    fetch(csvFilePath)
      .then((res) => res.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const { actualCounts, predictedCounts } = countLabels(results.data);
            setActualLabelCounts(actualCounts);
            setPredictedLabelCounts(predictedCounts);
          },
        });
      });
  }, [csvFilePath]);

  // Function to count occurrences of each label in actual and predicted labels separately
  const countLabels = (data) => {
    const actualCounts = {};
    const predictedCounts = {};

    // Iterate through each row in the CSV
    data.forEach((row) => {
      // Count actual labels
      if (row.actual_labels) {
        const actualLabels = row.actual_labels
          .split(",")
          .map((label) => label.trim());
        actualLabels.forEach((label) => {
          if (label) {
            actualCounts[label] = (actualCounts[label] || 0) + 1;
          }
        });
      }

      // Count predicted labels
      if (row.predicted_labels) {
        const predictedLabels = row.predicted_labels
          .split(",")
          .map((label) => label.trim());
        predictedLabels.forEach((label) => {
          if (label) {
            predictedCounts[label] = (predictedCounts[label] || 0) + 1;
          }
        });
      }
    });

    return { actualCounts, predictedCounts };
  };

  return (
    <Container>
      <Title>Label Count Viewer</Title>

      <h2>Actual Labels Count</h2>
      <div>
        {Object.keys(actualLabelCounts).map((label) => (
          <LabelCount key={label}>
            <LabelText>
              <strong>{label}:</strong> {actualLabelCounts[label]}
            </LabelText>
          </LabelCount>
        ))}
      </div>

      <h2>Predicted Labels Count</h2>
      <div>
        {Object.keys(predictedLabelCounts).map((label) => (
          <LabelCount key={label}>
            <LabelText>
              <strong>{label}:</strong> {predictedLabelCounts[label]}
            </LabelText>
          </LabelCount>
        ))}
      </div>
    </Container>
  );
}

export default LabelCountViewer;
