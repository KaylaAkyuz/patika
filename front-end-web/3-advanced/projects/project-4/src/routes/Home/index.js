import React from "react";
import {
  GithubOutlined,
  LinkedinOutlined,
  YoutubeOutlined,
  CodepenOutlined,
  InstagramOutlined,
  MediumOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import { Card, Typography, Image, Row, Col, Tag } from "antd";
import BB8 from "../../components/BB-8";
import styled from "styled-components";

const { Title, Paragraph } = Typography;

const HomeContainer = styled.div`
  color: #fff;
  padding: 32px;
  background: rgba(0, 0, 0, 0.5);
  position: relative;
  height: 50rem;
`;

const TagContainer = styled.div`
  margin-top: 16px;
  display: flex;
  gap: 8px;
`;

const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const SocialLinks = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1rem;
`;

const SocialIcon = styled.a`
  font-size: 4rem;
  color: #fff;
  margin-right: 1rem;
  transition: color 0.3s;

  &:hover {
    color: #94ffc7;
  }
`;

const Home = () => {
  return (
    <HomeContainer>
      <VideoBackground autoPlay loop muted>
        <source
          src={`${process.env.PUBLIC_URL}/videos/home.mp4`}
          type="video/mp4"
        />
      </VideoBackground>
      <Card
        title={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <Title
              level={2}
              style={{
                fontFamily: "VT323, monospace",
              }}
            >
              Welcome to my portfolio!{" "}
            </Title>
          </div>
        }
        style={{
          background: "#13052799",
        }}
      >
        <Row>
          <Col
            xs={24}
            sm={15}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Paragraph
              strong
              style={{
                marginBottom: "1.5rem",
                fontFamily: "VT323, monospace",
              }}
            >
              Hi there, I'm a digital explorer navigating the vast realms of
              code and creativity. 🚀✨
            </Paragraph>
            <Card
              style={{
                background: "#13052766",
              }}
            >
              <Paragraph
                style={{
                  fontFamily: "VT323, monospace",
                }}
              >
                <div
                  style={{
                    marginBottom: "0.5rem",
                  }}
                >
                  <b>My Traits:</b>
                </div>
                <ul>
                  <li>💡 Code Wizard</li>
                  <li>🎮 Retro Game Enthusiast</li>
                  <li>🚀 Byte-sized Dreamer</li>
                  <li>🌌 Sci-Fi Voyager</li>
                  <li>📷 Pixel Explorer</li>
                </ul>
              </Paragraph>
            </Card>
            <TagContainer>
              <Tag color="#ff00ff">Cyberpunk Lover</Tag>
              <Tag color="#33cc33">AI Enthusiast</Tag>
              <Tag color="#ff9900">Satire Sensei</Tag>
            </TagContainer>
            <BB8 />
          </Col>
          <Col
            xs={24}
            sm={8}
            offset={1}
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-start",
            }}
          >
            <Image
              src={`${process.env.PUBLIC_URL}/images/my-photo-1.jpg`}
              width={450}
              preview={false}
            />
          </Col>
        </Row>
      </Card>
      <Card
        style={{
          background: "#13052799",
          marginTop: "2rem",
          height: "9rem",
        }}
      >
        <SocialLinks>
          <SocialIcon
            href="https://github.com/kaylaa0"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubOutlined />
          </SocialIcon>
          <SocialIcon
            href="https://www.linkedin.com/in/-kayla-/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedinOutlined />
          </SocialIcon>
          <SocialIcon target="_blank" rel="noopener noreferrer">
            <InstagramOutlined />
          </SocialIcon>
          <SocialIcon target="_blank" rel="noopener noreferrer">
            <YoutubeOutlined />
          </SocialIcon>
          <SocialIcon target="_blank" rel="noopener noreferrer">
            <CodepenOutlined />
          </SocialIcon>
          <SocialIcon target="_blank" rel="noopener noreferrer">
            <MediumOutlined />
          </SocialIcon>
          <SocialIcon target="_blank" rel="noopener noreferrer">
            <WhatsAppOutlined />
          </SocialIcon>
        </SocialLinks>
      </Card>
    </HomeContainer>
  );
};

export default Home;
