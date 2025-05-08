import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  background-color: #1a1a1a;
  color: #ffffff;
  min-height: calc(100vh - 64px); // Adjust if your navbar height differs
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
`;

const Headline = styled.h1`
  font-size: 3rem;
  color: #00bcd4;
  margin-bottom: 1rem;
  font-weight: bold;
`;

const SubText = styled.p`
  font-size: 1.2rem;
  color: #cccccc;
  margin-bottom: 2rem;
`;

const CTAButton = styled(Link)`
  background-color: #00bcd4;
  color: #121212;
  padding: 0.8rem 2rem;
  border: none;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  font-size: 1rem;
  transition: background 0.3s ease;

  &:hover {
    background-color: #0097a7;
  }
`;

function HomePage() {
  return (
    <Container>
      <Headline>Check Your Eye Diseases</Headline>
      <SubText>
        Empowering early detection through intelligent predictions.
      </SubText>
      <CTAButton to='/disease-prediction'>Get Started</CTAButton>
    </Container>
  );
}

export default HomePage;
