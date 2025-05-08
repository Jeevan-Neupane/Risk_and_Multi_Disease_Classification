import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

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

const SlideContent = styled.div`
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: 0 auto;
  text-align: center;
`;

const RetinaImage = styled.img`
  width: 250px;
  height: 250px;
  object-fit: contain;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-bottom: 1rem;
`;

const Label = styled.p`
  margin: 0.3rem 0;
  font-size: 1rem;

  span {
    font-weight: bold;
    margin-right: 0.3rem;
  }
`;

function ImagePredictionSwiper({ csvFilePath, imageDirPath }) {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    // Fetch the CSV file dynamically based on the passed path
    fetch(csvFilePath)
      .then((res) => res.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => setRecords(results.data),
        });
      });
  }, [csvFilePath]);

  // Compare actual labels and predicted labels
  const compareLabels = (actualLabels, predictedLabels) => {
    const actualSet = new Set(
      actualLabels.split(",").map((label) => label.trim())
    );
    const predictedSet = new Set(
      predictedLabels.split(",").map((label) => label.trim())
    );

    // Check if actual and predicted labels match
    return [...actualSet].map((label) => ({
      label,
      isMatch: predictedSet.has(label),
    }));
  };

  return (
    <Container>
      <Title>Retinal Disease Prediction Viewer</Title>
      <Swiper
        navigation={true}
        modules={[Navigation]}
        spaceBetween={30}
      >
        {records.map((row, index) => {
          const actualLabels = row.actual_labels || "";
          const predictedLabels = row.predicted_labels || "";

          const actualLabelComparison = compareLabels(
            actualLabels,
            predictedLabels
          );
          const predictedLabelComparison = compareLabels(
            predictedLabels,
            actualLabels
          );

          return (
            <SwiperSlide key={index}>
              <SlideContent>
                {/* Dynamically set the image path */}
                <RetinaImage
                  src={`${imageDirPath}/${row.image_id}.png`} // Image path dynamically from props
                  alt={`Retina ${row.image_id}`}
                  onError={(e) => (e.target.style.display = "none")}
                />
                <Label>
                  <span>Image ID:</span> {row.image_id}
                </Label>

                {/* Render the actual labels with color based on comparison */}
                <Label>
                  <span>Actual Labels:</span>
                  {actualLabelComparison.map(({ label, isMatch }, idx) => (
                    <span
                      key={idx}
                      style={{ color: isMatch ? "green" : "red" }}
                    >
                      {label}
                    </span>
                  ))}
                </Label>

                {/* Render the predicted labels with color based on comparison */}
                <Label>
                  <span>Predicted Labels:</span>
                  {predictedLabelComparison.map(({ label, isMatch }, idx) => (
                    <span
                      key={idx}
                      style={{ color: isMatch ? "green" : "red" }}
                    >
                      {label}
                    </span>
                  ))}
                </Label>
              </SlideContent>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Container>
  );
}

export default ImagePredictionSwiper;
