import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Input, Select, Button, Drawer, Checkbox } from "antd";
import propNameMap from "utils/propNameMap";

const { Option } = Select;

const PropEditorDrawer = ({
  open,
  handleClose,
  customizedProps,
  setCustomizedProps,
  RepresentedComponentPropTypes,
  element,
}) => {
  const [form] = Form.useForm();
  const [additionalOptions, setAdditionalOptions] = useState(
    customizedProps.options ? customizedProps.options : []
  );

  const addOption = () => {
    setAdditionalOptions([...additionalOptions, { value: "", label: "" }]);
  };

  const removeOption = (index) => {
    const newOptions = [...additionalOptions];
    newOptions.splice(index, 1);
    setAdditionalOptions(newOptions);
  };

  const onFinish = (values) => {
    if (values.options) {
      values.options = [...additionalOptions];
    }

    const { formLabel, ...otherValues } = values;

    element.formlabel = formLabel;

    const filteredValues = {};
    for (const key in otherValues) {
      if (otherValues[key] !== undefined) {
        filteredValues[key] = otherValues[key];
      }
    }

    setCustomizedProps(filteredValues);
    handleClose();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const initialValues = element.formlabel
    ? { ...customizedProps, formLabel: element.formlabel }
    : {
        ...customizedProps,
      };

  return (
    <Drawer
      title="Customize"
      placement="right"
      closable={false}
      onClose={handleClose}
      open={open}
      width="30rem"
    >
      <Form
        form={form}
        name={`customize-${element.id}`}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={initialValues}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
      >
        {element.formlabel && (
          <Form.Item key="formLabel" name="formLabel" label="Form Label">
            <Input />
          </Form.Item>
        )}

        {Object.keys(RepresentedComponentPropTypes).map((propName) => {
          const propType = RepresentedComponentPropTypes[propName];

          const inputComponent = (() => {
            if (propType === PropTypes.bool) {
              return <Checkbox />;
            } else if (propType === PropTypes.string) {
              return <Input type="text" />;
            } else if (propType === PropTypes.number) {
              return <Input type="number" />;
            } else if (propName === "options") {
              return (
                <div>
                  {additionalOptions.map((option, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        marginBottom: "5px",
                      }}
                    >
                      <Input
                        value={option.value}
                        onChange={(e) => {
                          const newOptions = [...additionalOptions];
                          newOptions[index].value = e.target.value;
                          newOptions[index].label = e.target.value;
                          setAdditionalOptions(newOptions);
                        }}
                      />
                      <Button onClick={() => removeOption(index)}>-</Button>
                    </div>
                  ))}
                  <Button onClick={addOption}>Add Option</Button>
                </div>
              );
            } else if (Array.isArray(propType)) {
              return (
                <Select>
                  {propType.map((option) => (
                    <Option key={option} value={option}>
                      {option}
                    </Option>
                  ))}
                </Select>
              );
            }

            return null;
          })();

          if (inputComponent) {
            return (
              <Form.Item
                key={propName}
                name={propName}
                label={propNameMap[propName] ? propNameMap[propName] : propName}
                valuePropName={
                  propType === PropTypes.bool ? "checked" : "value"
                }
              >
                {inputComponent}
              </Form.Item>
            );
          }

          return null;
        })}
        <Form.Item wrapperCol={{ span: 14, offset: 4 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default PropEditorDrawer;
