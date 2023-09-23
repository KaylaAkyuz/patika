import React from "react";
import { List, Card, Typography, Button, Modal, Tag, Popover } from "antd";

const { Text, Title } = Typography;

const BookList = ({ data }) => {
  const [modal, contextHolder] = Modal.useModal();

  return (
    <>
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 4,
          xl: 5,
          xxl: 6,
        }}
        style={{
          marginTop: "1rem",
        }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Card
              cover={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "365px",
                  }}
                >
                  {item.cover_i ? (
                    <img
                      alt={item.title}
                      src={`https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg`}
                      style={{ width: "100%", height: "auto" }}
                    />
                  ) : (
                    <img
                      alt="not found"
                      src={`${process.env.PUBLIC_URL}/images/not-found.png`}
                      style={{ width: "100%", height: "auto" }}
                    />
                  )}
                </div>
              }
              actions={[
                <Button
                  type="primary"
                  shape="round"
                  onClick={() =>
                    modal.confirm({
                      title: item.title,
                      icon: null,
                      content: (
                        <>
                          <Title level={5}>Authors</Title>
                          {item.author_name &&
                            item.author_name.map((author) => (
                              <Tag>{author}</Tag>
                            ))}
                          <Title level={5}>Publish Year</Title>
                          <Text>{item.first_publish_year}</Text>
                          <Title level={5}>Edition Count</Title>
                          <Text>{item.edition_count}</Text>
                          <Title level={5}>Number of Pages</Title>
                          <Text>{item.number_of_pages_median}</Text>
                        </>
                      ),
                      okText: "Close",
                      cancelButtonProps: { style: { display: "none" } },
                    })
                  }
                >
                  Details
                </Button>,
                <Button
                  type="link"
                  href={`https://openlibrary.org${item.key}`}
                  target="_blank"
                >
                  More Info
                </Button>,
              ]}
            >
              <Card.Meta
                title={item.title}
                description={
                  item.author_name && (
                    <Popover
                      content={
                        item.author_name.length > 4 ? (
                          <ul>
                            {item.author_name.slice(4).map((author) => (
                              <li>{author}</li>
                            ))}
                          </ul>
                        ) : null
                      }
                      overlayInnerStyle={{
                        paddingRight: "2rem",
                      }}
                    >
                      {item.author_name.slice(0, 4).join(", ")}
                    </Popover>
                  )
                }
              />
            </Card>
          </List.Item>
        )}
      />
      {contextHolder}
    </>
  );
};

export default BookList;
