# Eye Disease Classification and Risk Prediction

This project is a React-based web application for classifying eye diseases and predicting disease risks using retinal images. It provides an intuitive interface for visualizing predictions, confusion matrices, and label counts.

---

## Project Structure

### Root Files

- **`.gitignore`**: Specifies intentionally untracked files to ignore.
- **`index.html`**: The entry HTML file for the Vite application.
- **`package.json`**: Contains project metadata and dependencies.
- **`README.md`**: Documentation for the project.

---

### Public Directory

- **`public/assets/`**: Contains retinal images for test and validation sets.
  - `retinal_images_test/`: Test set images.
  - `retinal_images_val/`: Validation set images.
- **`public/csv_files/`**: Contains CSV files for predictions and labels.
  - `multiple_predictions_test_final.csv`: Test set predictions for multiple diseases.
  - `multiple_predictions_val_final.csv`: Validation set predictions for multiple diseases.
  - `risk_predictions.csv`: Test set predictions for disease risks.
  - `risk_predictions_val.csv`: Validation set predictions for disease risks.

---

### Source Directory (`src/`)

#### Core Files

- **`App.jsx`**: Main application component that defines routes and global styles.
- **`main.jsx`**: Entry point for the React application.

#### Components (`src/components/`)

- **`Disease_Pred_test.jsx`**: Component for displaying disease predictions, label counts, and confusion matrices.
- **`Disease_risk_test.jsx`**: Component for displaying disease risk predictions and label counts.
- **`Diseases_Confusion_Matrix.jsx`**: Component for rendering confusion matrices for specific diseases.
- **`Diseases_Counter.jsx`**: Component for counting and displaying actual and predicted labels.
- **`ImagePredictionViewer.jsx`**: Component for visualizing disease predictions with retinal images.
- **`ImagePredictionRiskViewer.jsx`**: Component for visualizing disease risk predictions with retinal images.
- **`Navbar.jsx`**: Navigation bar component for routing between pages.

#### Layouts (`src/layout/`)

- **`Layouts.jsx`**: Defines the layout structure, including the navbar and content wrapper.

#### Pages (`src/pages/`)

- **`homepage/HomePage.jsx`**: Homepage with a call-to-action for starting disease classification.
- **`disease_prediction/Disease_Prediction.jsx`**: Page for selecting and displaying disease predictions.
- **`risk_prediction/Risk_Prediction.jsx`**: Page for selecting and displaying disease risk predictions.

#### Styles (`src/styles/`)

- **`GlobalStyle.js`**: Defines global CSS styles using `styled-components`.
- **`responsive.js`**: Contains responsive design utilities for different screen sizes.

---
### Dataset

The dataset used in this project consists of retinal images and corresponding CSV files for disease classification and risk prediction. It is organized into test and validation sets for both tasks.

#### Retinal Images

- **Location**: `public/assets/`
  - `retinal_images_test/`: Contains retinal images for the test set.
  - `retinal_images_val/`: Contains retinal images for the validation set.




### CSV Files

#### `public/csv_files/multiple_predictions_test_final.csv`

- **Purpose**: Contains test set predictions for multiple diseases.
- **Columns**:
  - `image_id`: Unique identifier for the image.
  - `actual_labels`: Actual disease labels.
  - `predicted_labels`: Predicted disease labels.

#### `public/csv_files/multiple_predictions_val_final.csv`

- **Purpose**: Contains validation set predictions for multiple diseases.
- **Columns**:
  - `image_id`: Unique identifier for the image.
  - `actual_labels`: Actual disease labels.
  - `predicted_labels`: Predicted disease labels.

#### `public/csv_files/risk_predictions.csv`

- **Purpose**: Contains test set predictions for disease risks.
- **Columns**:
  - `image_id`: Unique identifier for the image.
  - `actual_label`: Actual risk label.
  - `predicted_label`: Predicted risk label.

#### `public/csv_files/risk_predictions_val.csv`

- **Purpose**: Contains validation set predictions for disease risks.
- **Columns**:
  - `image_id`: Unique identifier for the image.
  - `actual_label`: Actual risk label.
  - `predicted_label`: Predicted risk label.

---

### Scripts

- **`npm run dev`**: Starts the development server.
- **`npm run build`**: Builds the project for production.
- **`npm run preview`**: Previews the production build.
- **`npm run lint`**: Runs ESLint to check for code issues.

---

## Technologies Used

- **Frontend**: React, React Router, Styled Components
- **Build Tool**: Vite
- **CSV Parsing**: PapaParse
- **Swiper**: For interactive image sliders
- **Linting**: ESLint

---

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/eye-disease-classification.git
   cd Risk_and_Multi_Disease_Classification
   ```
2.Install dependencies:

```
npm install
```

3.Start the development server:

```
npm run dev
```

4. Open the application in your browser at http://localhost:5173.
