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
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_EVENT } from "graphql/Event/mutations";
import { getLocations } from "graphql/Location/queries";
import { getUsers } from "graphql/User/queries";

const CreateEvent = () => {
  const navigate = useNavigate();
  const {
    loading: loadingLocations,
    error: errorLocations,
    data: dataLocations,
  } = useQuery(getLocations);

  const {
    loading: loadingUsers,
    error: errorUsers,
    data: dataUsers,
  } = useQuery(getUsers);

  const [addEvent, { loading: loadingSubmit, error: errorSubmit }] =
    useMutation(ADD_EVENT);

  if (errorLocations || errorUsers || errorSubmit) {
    return (
      <div>
        <p>
          Error: {errorLocations} {errorUsers} {errorSubmit}(
        </p>
      </div>
    );
  }

  const handleSubmit = async (values) => {
    try {
      await addEvent({
        variables: {
          eventInput: {
            title: values.title,
            desc: values.description,
            date: values.date.format("YYYY-MM-DD"),
            from: values.from.format("HH:mm"),
            to: values.to.format("HH:mm"),
            location_id: values.location,
            user_id: values.user,
          },
        },
      });
      navigate("/events");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Skeleton
      loading={loadingLocations && loadingUsers}
      active
      className={styles.skeleton}
    >
      <Title text="Create Event" />
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={{ size: "default" }}
        size={"default"}
        onFinish={handleSubmit}
        requiredMark={(label, { required }) => <>{label}</>}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please enter a title" }]}
        >
          <Input disabled={loadingSubmit} />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please enter a description" }]}
        >
          <Input disabled={loadingSubmit} />
        </Form.Item>
        <Form.Item
          label="Date"
          name="date"
          rules={[{ required: true, message: "Please pick a date" }]}
        >
          <DatePicker disabled={loadingSubmit} />
        </Form.Item>
        <Form.Item
          label="From"
          name="from"
          rules={[{ required: true, message: "Please pick a starting time" }]}
        >
          <TimePicker disabled={loadingSubmit} />
        </Form.Item>
        <Form.Item
          label="To"
          name="to"
          rules={[{ required: true, message: "Please pick an ending time" }]}
        >
          <TimePicker disabled={loadingSubmit} />
        </Form.Item>
        <Form.Item
          label="Location"
          name="location"
          rules={[{ required: true, message: "Please select a location" }]}
        >
          <Select disabled={loadingSubmit}>
            {dataLocations &&
              dataLocations.locations.map((location) => (
                <Select.Option key={location.id} value={location.id}>
                  {location.name}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="User"
          name="user"
          rules={[{ required: true, message: " Please select the user" }]}
        >
          <Select disabled={loadingSubmit}>
            {dataUsers &&
              dataUsers.users.map((user) => (
                <Select.Option key={user.id} value={user.id}>
                  {user.username}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 4,
          }}
        >
          <Button type="primary" htmlType="submit" loading={loadingSubmit}>
            Create
          </Button>
        </Form.Item>
      </Form>
    </Skeleton>
  );
};

export default CreateEvent;
