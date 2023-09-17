import React from "react";
import styles from "styles/skeleton.module.css";
import {
  Skeleton,
  Button,
  Form,
  Input,
  DatePicker,
  Select,
  TimePicker,
} from "antd";
import Title from "components/Title";

const CreateEvent = () => {
  return (
    <Skeleton loading={false} active className={styles.skeleton}>
      <Title text="Create Event" />
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={{ size: "default" }}
        onValuesChange={() => {}}
        size={"default"}
      >
        <Form.Item label="Title">
          <Input />
        </Form.Item>
        <Form.Item label="Description">
          <Input />
        </Form.Item>
        <Form.Item label="Date">
          <DatePicker />
        </Form.Item>
        <Form.Item label="From">
          <TimePicker />
        </Form.Item>
        <Form.Item label="To">
          <TimePicker />
        </Form.Item>
        <Form.Item label="Location">
          <Select>
            <Select.Option value="demo">Demo</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 4,
          }}
        >
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Form>
    </Skeleton>
  );
};

export default CreateEvent;
