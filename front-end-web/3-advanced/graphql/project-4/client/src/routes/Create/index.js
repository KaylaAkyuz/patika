import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Form, Input, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { CREATE_QUESTION, CREATE_OPTION } from "../../graphql";
import { nanoid } from "nanoid";

const QuestionCreation = () => {
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState([""]);

  const [createQuestion] = useMutation(CREATE_QUESTION);
  const [createOption] = useMutation(CREATE_OPTION);

  const handleSubmit = async () => {
    const optionsArray = options.filter((option) => option.trim() !== "");

    if (questionText.trim() === "" || optionsArray.length < 2) {
      return;
    }

    try {
      const id = nanoid();
      createQuestion({
        variables: {
          id: id,
          text: questionText,
        },
      });

      optionsArray.forEach(async (option) => {
        createOption({
          variables: {
            text: option,
            poll_id: id,
          },
        });
      });

      setQuestionText("");
      setOptions([""]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Create New Question</h1>
      <Form onFinish={handleSubmit}>
        <Form.Item label="Question">
          <Input
            type="text"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Options">
          {options.map((option, index) => (
            <Input
              key={index}
              type="text"
              value={option}
              onChange={(e) => {
                const updatedOptions = [...options];
                updatedOptions[index] = e.target.value;
                setOptions(updatedOptions);
              }}
            />
          ))}
          <Button
            type="dashed"
            onClick={() => setOptions([...options, ""])}
            icon={<PlusOutlined />}
          >
            Add Option
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create Question
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default QuestionCreation;
