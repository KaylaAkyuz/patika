import React, { useState } from "react";
import { Card, InputNumber, Button, Result } from "antd";
import styled from "styled-components";

const CalculatorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const InputContainer = styled.div`
  margin-bottom: 20px;
`;

const ResultContainer = styled(Result)`
  margin-top: 20px;

  .ant-result-title {
    font-size: 24px;
    margin-bottom: 10px;
  }

  .ant-btn {
    margin-top: 10px;
  }
`;

const Home = () => {
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);
  const [bmi, setBMI] = useState(null);
  const [resultStatus, setResultStatus] = useState("info");
  const [dietRecommendations, setDietRecommendations] = useState(null);

  const calculateBMI = () => {
    if (height && weight) {
      const heightInMeters = height / 100;
      const bmiValue = weight / (heightInMeters * heightInMeters);
      setBMI(bmiValue.toFixed(2));

      if (bmiValue < 18.5) setResultStatus("warning");
      else if (bmiValue >= 18.5 && bmiValue < 24.9) setResultStatus("success");
      else setResultStatus("error");

      const historyData = JSON.parse(localStorage.getItem("bmiHistory")) || [];
      const newEntry = { height, weight, bmi: bmiValue.toFixed(2) };
      historyData.push(newEntry);
      localStorage.setItem("bmiHistory", JSON.stringify(historyData));

      const recommendations = generateDietRecommendations(bmiValue);
      setDietRecommendations(recommendations);
    }
  };

  const generateDietRecommendations = (bmi) => {
    let recommendations = "";

    if (bmi < 16.0) {
      recommendations =
        "You are severely underweight. Please consult a healthcare professional immediately for a personalized diet plan.";
    } else if (bmi >= 16.0 && bmi < 16.9) {
      recommendations =
        "You are extremely underweight. It's crucial to seek medical advice for a comprehensive dietary plan and possible medical intervention.";
    } else if (bmi >= 17.0 && bmi < 18.4) {
      recommendations =
        "You are underweight. Consider increasing your calorie intake with nutrient-rich foods like lean proteins, whole grains, and healthy fats.";
    } else if (bmi >= 18.5 && bmi < 24.9) {
      recommendations =
        "Congratulations! You have a healthy BMI. Maintain a balanced diet with plenty of fruits, vegetables, lean proteins, and whole grains.";
    } else if (bmi >= 25.0 && bmi < 29.9) {
      recommendations =
        "You are overweight. Focus on portion control, increase physical activity, and choose a balanced diet with reduced calorie intake.";
    } else if (bmi >= 30.0 && bmi < 34.9) {
      recommendations =
        "You are obese (Class I). Consult a healthcare professional to develop a weight loss plan. Emphasize portion control and increase physical activity.";
    } else if (bmi >= 35.0 && bmi < 39.9) {
      recommendations =
        "You are obese (Class II). Medical supervision is essential for weight management. Work with a healthcare provider to create a customized diet and exercise plan.";
    } else {
      recommendations =
        "You are severely obese (Class III). Immediate medical attention is required. Consult a healthcare professional to discuss surgical and non-surgical weight loss options.";
    }

    return recommendations;
  };

  return (
    <CalculatorContainer>
      <Card title="BMI Calculator">
        <InputContainer>
          <label>Height (cm):</label>
          <InputNumber
            min={0}
            max={1000}
            value={height}
            onChange={(value) => setHeight(value)}
          />
        </InputContainer>
        <InputContainer>
          <label>Weight (kg):</label>
          <InputNumber
            min={0}
            max={1000}
            value={weight}
            onChange={(value) => setWeight(value)}
          />
        </InputContainer>
        <Button type="primary" onClick={calculateBMI}>
          Calculate BMI
        </Button>
        {bmi && (
          <>
            <ResultContainer
              status={resultStatus}
              title={`Your BMI: ${bmi}`}
              extra={
                <Button type="primary" onClick={() => setBMI(null)}>
                  Reset
                </Button>
              }
            />
            {dietRecommendations && (
              <div>
                <h2>Diet Recommendations:</h2>
                <p>{dietRecommendations}</p>
              </div>
            )}
          </>
        )}
      </Card>
    </CalculatorContainer>
  );
};

export default Home;
