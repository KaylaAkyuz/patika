import React from "react";
import { Card, Typography, Image, Row, Col } from "antd";
import Title from "components/Title";

const { Title: AntdTitle, Paragraph } = Typography;

function Home() {
  return (
    <div>
      <Title text="Home" />
      <Card
        title={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <AntdTitle level={2}>Welcome to </AntdTitle>
            <Image
              src="./images/logo_title.png"
              width={200}
              preview={false}
              style={{
                marginTop: "0.5rem",
              }}
            />
          </div>
        }
      >
        <Row>
          <Col xs={24} sm={13}>
            <Paragraph
              strong
              style={{
                marginBottom: "1.5rem",
              }}
            >
              Experience the simplistic event management system with the
              neon-lit world of HoloGala.
            </Paragraph>
            <Card>
              <Paragraph>
                <div
                  style={{
                    marginBottom: "0.5rem",
                  }}
                >
                  <b>Features:</b>
                </div>
                <ul>
                  <li>CRUD event management</li>
                  <li>Handy user structure</li>
                  <li>Location capabilities</li>
                  <li>Event registration</li>
                  <li>Neo-Aesthetic Design</li>
                </ul>
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={10} offset={1}>
            <Image src="./images/event_stock.jpg" preview={false} />
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default Home;
