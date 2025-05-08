import React, { Children } from "react";
import ImagePredictionViewer from "./components/ImagePredictionViewer";
import Layouts from "./layout/Layouts";
import HomePage from "./pages/homepage/HomePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";
import Risk_Prediction from "./pages/risk_prediction/Risk_Prediction";
import Disease_Prediction from "./pages/disease_prediction/Disease_Prediction";

function App() {
  const route = [
    {
      path: "/",
      element: <Layouts />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/risk-prediction",
          element: <Risk_Prediction />,
        },
        {
          path: "/disease-prediction",
          element: <Disease_Prediction />,
        },
      ],
    },
  ];

  const router = createBrowserRouter(route, {
    future: {
      v7_partialHydration: true,
    },
  });

  return (
    <div>
      <RouterProvider router={router} />
      <GlobalStyle />
    </div>
  );
}

export default App;
