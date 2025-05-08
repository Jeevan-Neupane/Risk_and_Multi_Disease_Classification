import React from "react";
import DarkNavbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

// Styled-components for Layout
const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;  // Make the layout take full height of the screen
  background-color: #121212;  // Dark background for the layout
  color: #ffffff;  // Text color to white for readability
`;

const ContentWrapper = styled.div`
  flex-grow: 1;  // Ensures content grows to fill remaining space
  padding: 2rem;  // Add padding for space around the content
  overflow-y: auto;  // Allow scrolling if content overflows
`;

function Layouts() {
  return (
    <LayoutContainer>
      <DarkNavbar />
      <ContentWrapper>
        <Outlet />
      </ContentWrapper>
    </LayoutContainer>
  );
}

export default Layouts;
