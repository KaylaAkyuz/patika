import React, { useState, useEffect, useRef } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Input, List, Card, Button } from "antd";
import {
  SEND_MESSAGE_MUTATION,
  NEW_MESSAGE_SUBSCRIPTION,
  GET_MESSAGES_QUERY,
  NEW_USER_MUTATION,
} from "../../graphql";

const Chat = () => {
  const listRef = useRef(null);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [sendMessage] = useMutation(SEND_MESSAGE_MUTATION);

  const { data, subscribeToMore } = useQuery(GET_MESSAGES_QUERY);
  const [addUser] = useMutation(NEW_USER_MUTATION);

  if (user === null) {
    addUser().then(({ data }) => {
      setUser(data.addUser);
    });
  }

  const messages = data ? new Set(data.messages) : [];

  const handleSendMessage = async () => {
    if (message.trim() === "") return;

    await sendMessage({
      variables: {
        input: {
          text: message,
          userId: user.id,
        },
      },
    });
    setMessage("");
  };

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTo(0, 9999);
    }
  }, [data]);

  useEffect(() => {
    subscribeToMore({
      document: NEW_MESSAGE_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;

        return {
          messages: [...prev.messages, subscriptionData.data.messageCreated],
        };
      },
    });
  }, [subscribeToMore]);

  return (
    <Card
      title="Message Board"
      style={{
        flex: 1,
        margin: "10rem auto",
        maxWidth: "800px",
      }}
    >
      <div
        ref={listRef}
        style={{
          maxHeight: "400px",
          overflowY: "auto",
        }}
      >
        <List
          dataSource={messages}
          renderItem={(item) => (
            <List.Item
              style={{
                textAlign: item.userId === user.id ? "right" : "left",
                justifyContent:
                  item.userId === user.id ? "flex-end" : "flex-start",
              }}
            >
              <div
                style={{
                  background: item.userId === user.id ? "#1890ff" : "#f0f0f0",
                  color: item.userId === user.id ? "white" : "black",
                  padding: "8px",
                  borderRadius: "5px",
                  display: "inline-block",
                  maxWidth: "70%",
                }}
              >
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
        addonAfter={
          <Button
            onClick={handleSendMessage}
            size="small"
            style={{
              width: "50px",
            }}
          >
            Send
          </Button>
        }
      />
    </Card>
  );
};

export default Chat;
