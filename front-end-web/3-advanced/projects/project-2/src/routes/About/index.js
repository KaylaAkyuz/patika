// src/components/About.js
import React from "react";
import { Card } from "antd";
import styled from "styled-components";

const AboutContainer = styled(Card)`
  text-align: center;
  padding: 20px;
`;

const About = () => {
  return (
    <AboutContainer>
      <h1>About Us</h1>
      <p>
        Welcome to the future of e-commerce! We provide a wide range of products
        at affordable prices. Our goal is to make shopping online easy and
        convenient for you.
      </p>
      <p>
        If you have any questions or feedback, please don't hesitate to contact
        us. We are here to assist you in any way we can.
      </p>
    </AboutContainer>
  );
};

export default About;
