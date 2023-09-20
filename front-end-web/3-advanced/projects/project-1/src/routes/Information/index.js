import React from "react";
import { Card } from "antd";
import styled from "styled-components";

const InformationContainer = styled.div`
  padding: 20px;
`;

const Information = () => {
  return (
    <InformationContainer>
      <Card title="BMI Information">
        <div>
          <h2>What is BMI?</h2>
          <p>
            BMI, or Body Mass Index, is a numerical value calculated from a
            person's height and weight. It is a simple way to assess whether a
            person has a healthy body weight relative to their height.
          </p>
        </div>

        <div>
          <h2>How is BMI Calculated?</h2>
          <p>
            BMI is calculated using the formula: BMI = weight (kg) / (height (m)
            * height (m))
          </p>
        </div>

        <div>
          <h2>BMI Categories:</h2>
          <ul>
            <li>Underweight: BMI &lt; 18.5</li>
            <li>Normal Weight: 18.5 ≤ BMI &lt; 24.9</li>
            <li>Overweight: 25.0 ≤ BMI &lt; 29.9</li>
            <li>Obese: BMI &gt;= 30.0</li>
          </ul>
        </div>

        <div>
          <h2>Health Recommendations:</h2>
          <p>
            <strong>Underweight:</strong> If your BMI is below 18.5, you may be
            underweight. Consider consulting a healthcare professional for
            guidance on achieving a healthy weight.
          </p>
          <p>
            <strong>Normal Weight:</strong> A BMI between 18.5 and 24.9 is
            considered normal. Maintain a balanced diet and regular exercise to
            stay healthy.
          </p>
          <p>
            <strong>Overweight:</strong> If your BMI falls between 25.0 and
            29.9, you may be overweight. It's a good idea to focus on weight
            management through diet and exercise.
          </p>
          <p>
            <strong>Obese:</strong> A BMI of 30.0 or higher indicates obesity.
            Consult a healthcare professional for a personalized weight
            management plan.
          </p>
        </div>
      </Card>
    </InformationContainer>
  );
};

export default Information;
