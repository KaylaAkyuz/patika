import React, { useState } from "react";
import { Button, Card } from "antd";
import PropEditorDrawer from "components/PropEditor";
import antdPropTypes from "utils/propTypes";

const RepresentingElement = ({ element, handleDelete }) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const RepresentedComponent = element.representedComponent;
  const customizedProps = element.customizedProps;

  const setCustomizedProps = (customizedProps) => {
    element.customizedProps = customizedProps;
  };

  return (
    <Card
      style={{ width: "100%", background: "#370e71" }}
      bodyStyle={{
        padding: "1rem 3rem",
      }}
      title={element.label}
      extra={
        <>
          <Button onClick={() => setDrawerVisible(true)}>Customize</Button>
          <Button onClick={() => handleDelete()}>Delete</Button>
        </>
      }
    >
      <RepresentedComponent
        {...customizedProps}
        style={{
          width: "100%",
        }}
        element={element}
      >
        {customizedProps.text ? customizedProps.text : null}
      </RepresentedComponent>

      <PropEditorDrawer
        open={drawerVisible}
        handleClose={() => setDrawerVisible(false)}
        element={element}
        customizedProps={customizedProps}
        setCustomizedProps={setCustomizedProps}
        RepresentedComponentPropTypes={antdPropTypes[element.type]}
      />
    </Card>
  );
};

export default RepresentingElement;
