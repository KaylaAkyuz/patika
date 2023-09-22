import React, { useState, useEffect, useRef } from "react";
import { Input, List, Card, Button, Modal, Tag, Divider } from "antd";
import styled from "styled-components";
import { io } from "socket.io-client";

const socket = io("https://chat-app-backend-neron.onrender.com");

const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Chat = () => {
  const listRef = useRef(null);
  const [user, setUser] = useState("");
  const [userList, setUserList] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isAliasModalVisible, setIsAliasModalVisible] = useState(false);
  const [modal, contextHolder] = Modal.useModal();

  const handleSendMessage = () => {
    if (message.trim() === "") return;

    socket.emit("chat message", message);

    setMessage("");
  };

  const scrollToBottom = () => {
    if (!listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  };

  const handleAliasRegistration = (alias) => {
    socket.emit("user connect", alias);

    socket.on("alias set", (registeredAlias) => {
      setUser(registeredAlias);
      setIsAliasModalVisible(false);
      localStorage.setItem("userAlias", registeredAlias);
    });

    socket.on("alias was set", (registeredAlias) => {
      setUser(registeredAlias);
      setIsAliasModalVisible(false);
      localStorage.setItem("userAlias", registeredAlias);
    });

    socket.on("alias taken", () => {
      modal.warning({
        title: "Alias Taken",
        content: `The alias ${alias} is already taken. Please enter another alias.`,
      });
      localStorage.removeItem("userAlias");
    });
  };

  useEffect(() => {
    const storedAlias = localStorage.getItem("userAlias");
    if (storedAlias) {
      handleAliasRegistration(storedAlias);
    } else {
      setIsAliasModalVisible(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    socket.on("user list update", (userList) => {
      setUserList(userList);
    });

    socket.on("initial messages", (messages) => {
      setMessages(messages);
    });

    return () => {
      socket.off("user list update");
      socket.off("initial messages");
    };
  }, [user]);

  useEffect(() => {
    socket.on("chat message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);

      scrollToBottom();
    });

    return () => {
      socket.off("chat message");
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listRef.current]);

  return (
    <>
      <VideoBackground autoPlay loop muted>
        <source
          src={`${process.env.PUBLIC_URL}/videos/background.mp4`}
          type="video/mp4"
        />
      </VideoBackground>
      {contextHolder}
      {isAliasModalVisible ? (
        <Card
          title="Alias Registration"
          style={{
            flex: 1,
            margin: "15rem auto",
            maxWidth: "170px",
          }}
        >
          <p>Please enter your alias:</p>
          <Input
            placeholder="Alias"
            onPressEnter={(e) => {
              const alias = e.target.value.trim();
              if (alias) {
                handleAliasRegistration(alias);
              }
            }}
          />
        </Card>
      ) : (
        <Card
          title={`Welcome, ${user}`}
          style={{
            flex: 1,
            margin: "10rem auto",
            maxWidth: "800px",
          }}
        >
          <div
            style={{
              fontFamily: "monospace",
              marginBottom: "0.5rem",
            }}
          >
            Registered Users
          </div>
          <div>
            {userList &&
              userList.map((item, index) => (
                <Tag
                  color={`#${Math.floor(Math.random() * 16777215).toString(
                    16
                  )}`}
                  key={index}
                >
                  <span
                    style={{
                      color: "white",
                      background: "rgba(0,0,0,0.5)",
                      padding: "0 4px",
                      borderRadius: "2px",
                    }}
                  >
                    {item}
                  </span>
                </Tag>
              ))}
          </div>
          <Divider />
          <div
            ref={listRef}
            style={{
              maxHeight: "400px",
              overflowY: "auto",
            }}
          >
            <List
              dataSource={messages}
              split={false}
              renderItem={(item) => (
                <List.Item
                  style={{
                    textAlign: item.alias === user ? "right" : "left",
                    justifyContent:
                      item.alias === user ? "flex-end" : "flex-start",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      background: item.alias === user ? "#7c33e5" : "#94ffc7",
                      color: item.alias === user ? "white" : "black",
                      padding: "8px",
                      borderRadius: "5px",
                      display: "inline-block",
                      maxWidth: "70%",
                      minWidth: "92px",
                      paddingTop: "12px",
                      paddingBottom: "13px",
                      wordWrap: "break-word",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "0",
                        display: "flex",
                        fontSize: "8px",
                        fontWeight: "600",
                        color: item.alias === user ? "#94ffc7" : "#7c33e5",
                        marginBottom: "2px",
                        fontFamily: "monospace",
                        background:
                          item.alias === user
                            ? "rgba(0,0,0,0.5)"
                            : "rgba(255,255,255,0.5)",
                        padding: "0 4px",
                        borderRadius: "5px 5px 0 0",
                        left: item.alias === user ? "unset" : "0",
                        right: item.alias === user ? "0" : "unset",
                        minWidth: "100px",
                        textAlign: "center",
                      }}
                    >
                      {`~ ${item.alias}`}
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        bottom: "-2px",
                        display: "flex",
                        fontSize: "8px",
                        fontWeight: "600",
                        color: item.alias === user ? "#94ffc7" : "#7c33e5",
                        marginBottom: "2px",
                        fontFamily: "monospace",
                        background:
                          item.alias === user
                            ? "rgba(0,0,0,0.5)"
                            : "rgba(255,255,255,0.5)",
                        padding: "0 4px",
                        borderRadius: "0 0 5px 5px",
                        left: item.alias === user ? "unset" : "0",
                        right: item.alias === user ? "0" : "unset",
                        minWidth: "100px",
                        textAlign: "center",
                      }}
                    >
                      {`@ ${item.timestamp}`}
                    </div>

                    {item.text}
                  </div>
                </List.Item>
              )}
            />
          </div>
          <Input
            placeholder="Type your message..."
            style={{ marginTop: "1rem" }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onPressEnter={handleSendMessage}
            disabled={!user}
            addonAfter={
              <Button
                onClick={handleSendMessage}
                size="small"
                style={{
                  width: "50px",

                  border: "none",
                }}
                disabled={!user}
              >
                Send
              </Button>
            }
          />
        </Card>
      )}
    </>
  );
};

export default Chat;
