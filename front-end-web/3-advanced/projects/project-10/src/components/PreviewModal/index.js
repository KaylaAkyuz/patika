import React from "react";
import { Divider, Form, Modal } from "antd";

const PreviewModel = ({ formItems, open, handleOk, handleClose }) => {
  return (
    <Modal
      title="Preview"
      open={open}
      onOk={handleOk}
      onCancel={handleClose}
      cancelButtonProps={{ style: { display: "none" } }}
    >
      <Divider />
      {formItems.length > 0 && (
        <Form layout="vertical">
          {formItems.map((formItem, index) => (
            <Form.Item key={index} label={formItem.formlabel}>
              <formItem.representedComponent
                key={formItem.id}
                {...formItem.customizedProps}
              >
                {formItem.customizedProps.text
                  ? formItem.customizedProps.text
                  : null}
              </formItem.representedComponent>
            </Form.Item>
          ))}
        </Form>
      )}
    </Modal>
  );
};

export default PreviewModel;
