import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// Styled Components for Navbar
const Navbar = styled.nav`
  background-color: #121212;
  color: #ffffff;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: "Segoe UI", sans-serif;
`;

const Logo = styled(Link)`
  font-size: 3rem;
  font-weight: bold;
  letter-spacing: 1px;
  color: #00bcd4;
  text-decoration: none;
`;

const NavLinks = styled.ul`
  list-style: none;
  display: flex;
  gap: 2rem;
  margin: 0;
  padding: 0;
`;

const NavLink = styled(Link)`
  font-size: 1.6rem;
  color: #ffffff;
  text-decoration: none;
  transition: color 0.2s;
  cursor: pointer;

  &:hover {
    color: #00bcd4;
  }
`;

function DarkNavbar() {
  return (
    <Navbar>
      <Logo to='/' aria-label="Home">EYECARE</Logo>
      <NavLinks>
        <li>
          <NavLink to='/risk-prediction' aria-label="Disease Risk Prediction Page">
            Disease Risk
          </NavLink>
        </li>
        <li>
          <NavLink to='/disease-prediction' aria-label="Disease Classification Page">
            Disease Prediction
          </NavLink>
        </li>
      </NavLinks>
    </Navbar>
  );
}

export default DarkNavbar;
