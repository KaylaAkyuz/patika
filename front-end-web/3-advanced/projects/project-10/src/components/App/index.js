import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { Input, Select, Button, Card, Typography } from "antd";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import RepresentingElement from "components/RepresentingElement";
import PreviewModal from "components/PreviewModal";
import Author from "components/Author";

const { Title, Text } = Typography;

const grid = 8;

const initialFormItems = [
  {
    id: "1",
    type: "text",
    label: "Text",
    representedComponent: Text,
    customizedProps: { text: "Placeholder Text" },
  },
  {
    id: "2",
    type: "input",
    label: "Input",
    formlabel: "Placeholder label",
    representedComponent: Input,
    customizedProps: { bordered: true },
  },
  {
    id: "3",
    type: "select",
    label: "Select",
    formlabel: "Placeholder label",
    options: ["Option 1", "Option 2"],
    representedComponent: Select,
    customizedProps: {
      bordered: true,
      options: [
        {
          value: "Placeholder Option 1",
          label: "Placeholder Option 1",
        },
        {
          value: "Placeholder Option 2",
          label: "Placeholder Option 2",
        },
      ],
    },
  },
];

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  background: isDragging ? " #94ffc7" : "#370e71",
  color: isDragging ? "#222" : "#ddd",
  fontWeight: "bold",
  zIndex: isDragging ? 9 : 1,
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "#FFAD00" : "#1b0738",
  padding: grid,
  width: "14rem",
});

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const item = sourceClone[droppableSource.index];

  destClone.splice(droppableDestination.index, 0, {
    ...item,
    id: uuid(),
  });
  return destClone;
};

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

function App() {
  const [palette, setPalette] = useState([...initialFormItems]);
  const [formItems, setFormItems] = useState([]);
  const [isDraggingStarted, setIsDraggingStarted] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const onDragStart = () => {
    setIsDraggingStarted(true);
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;

    setIsDraggingStarted(false);
    if (!destination) {
      return;
    }
    if (destination.droppableId === "palette") return;

    const ourSource = source.droppableId === "palette" ? palette : formItems;
    const ourDestination =
      destination.droppableId === "palette" ? palette : formItems;

    if (source.droppableId === destination.droppableId) {
      const items = reorder(ourSource, source.index, destination.index);
      if (source.droppableId === "palette") {
        setPalette(items);
      } else {
        setFormItems(items);
      }
    } else {
      const result = move(ourSource, ourDestination, source, destination);
      setFormItems(result);
    }
  };

  return (
    <Card
      bodyStyle={{ display: "flex", padding: "2rem" }}
      style={{
        minHeight: "100vh",
      }}
      title={
        <Title
          level={3}
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: "3rem",
            marginBottom: "0",
            marginTop: "1rem",
            marginLeft: "19rem",
          }}
        >
          Ant Design Form Builder
        </Title>
      }
      extra={
        <Button
          type="primary"
          onClick={() => {
            setIsPreviewOpen(true);
          }}
        >
          Preview
        </Button>
      }
    >
      <PreviewModal
        formItems={formItems}
        open={isPreviewOpen}
        handleOk={() => {
          setIsPreviewOpen(false);
        }}
        handleClose={() => {
          setIsPreviewOpen(false);
        }}
      />
      <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
        <Droppable key={"palette"} droppableId={`palette`} isDropDisabled>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={{
                ...getListStyle(snapshot.isDraggingOver),
                position: "absolute",
                top: "7rem",
                left: "2rem",
                paddingBottom: isDraggingStarted ? 0 : "5rem",
                height: "200px",
                background: isDraggingStarted ? "rgba(0, 0, 0, 0)" : "#1b0738",
              }}
              {...provided.droppableProps}
            >
              {isDraggingStarted && (
                <div
                  style={{
                    ...getListStyle(false),
                    position: "absolute",
                    zIndex: 5,
                    width: "14rem",
                    top: "0",
                    left: "0",
                    paddingBottom: "5rem",
                    height: "200px",
                  }}
                >
                  {palette.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        ...getItemStyle(false, {}),
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                    >
                      {item.label}
                    </div>
                  ))}
                  <Author />
                </div>
              )}

              {palette.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-around",
                        }}
                      >
                        {item.label}
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              <Author />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <div
          style={{
            marginLeft: "18rem ",
            width: "100%",
            display: "flex",
          }}
        >
          <Droppable key={"container"} droppableId={`container`}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={{
                  ...getListStyle(snapshot.isDraggingOver),

                  flex: 1,
                  marginRight: "2rem",
                  marginTop: "1rem",
                }}
                {...provided.droppableProps}
              >
                {formItems.length > 0 ? (
                  formItems.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            ),
                            background: isDraggingStarted
                              ? "rgba(0, 0, 0, 0)"
                              : "#1b0738",
                          }}
                        >
                          <RepresentingElement
                            element={item}
                            handleDelete={() => {
                              const newState = [...formItems];
                              newState.splice(index, 1);
                              setFormItems(newState);
                            }}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))
                ) : (
                  <div
                    style={{
                      color: "#ddd",
                      textAlign: "center",
                      fontSize: "1.5rem",
                      padding: "2rem",
                      height: "207px",
                    }}
                  >
                    Drag and drop items here
                  </div>
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </Card>
  );
}

export default App;
