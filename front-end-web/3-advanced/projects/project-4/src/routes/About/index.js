import React from "react";
import { Card, Typography, Image, Row, Col } from "antd";
import styled from "styled-components";

const { Title, Paragraph } = Typography;

const AboutContainer = styled.div`
  color: #fff;
  padding: 32px;
  background: rgba(0, 0, 0, 0.5);
  position: relative;
  height: 50rem;
`;

const StyledParagraph = styled(Paragraph)`
  font-family: VT323, monospace;
`;

const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const About = () => {
  return (
    <AboutContainer>
      <VideoBackground autoPlay loop muted>
        <source
          src={`${process.env.PUBLIC_URL}/videos/about.mp4`}
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
              About Me 👾
            </Title>
          </div>
        }
        style={{
          background: "#130527DD",
        }}
      >
        <Row>
          <Col
            xs={24}
            sm={7}
            style={{
              display: "flex",
            }}
          >
            <Image
              src={`${process.env.PUBLIC_URL}/images/illustration-of-me.jpg`}
              width={500}
              preview={false}
            />
          </Col>
          <Col xs={24} sm={16} offset={1}>
            <Paragraph
              strong
              style={{
                marginBottom: "1.5rem",
                marginTop: "1.5rem",
                fontFamily: "VT323, monospace",
              }}
            >
              Hey there, fellow Earthling! 👋 I'm the pixel-pushing,
              code-wrangling, cyberpunk-loving creator behind this digital
              wonderland. 🌟
            </Paragraph>
            <Card
              style={{
                background: "#130527AA",
              }}
            >
              <StyledParagraph>
                👩‍💻 Code Conjurer: By day (and often by night), I'm a code wizard
                weaving spells in the virtual realm. My love for coding knows no
                bounds, and I'm always on a quest for the perfect algorithm. 🧙
              </StyledParagraph>
              <StyledParagraph>
                🌆 Cyberpunk Dreams: When I'm not debugging or designing, you
                can find me lost in the neon-lit streets of cyberpunk cities,
                chasing futuristic vibes and high-tech adventures. 💼
              </StyledParagraph>
              <StyledParagraph>
                🌟 Passion for Pixels: I have a deep-rooted appreciation for the
                beauty of pixels and the art of pixel-perfect design. Each pixel
                tells a story, and I'm here to make them sing! 🎨
              </StyledParagraph>
              <StyledParagraph>
                🕹️ Gaming Galore: Leveling up isn't just for code; I'm also a
                gaming guru who thrives in the virtual realms of pixels and
                polygons. From retro classics to modern masterpieces, I've
                conquered them all. 🎮
              </StyledParagraph>
              <StyledParagraph>
                🚀 Sci-Fi Seeker: My head's often in the stars, exploring the
                uncharted territories of science fiction, where the cosmos and
                cybernetics collide. 🌌
              </StyledParagraph>
              <StyledParagraph>
                💬 Satire Sensei: When I'm not crafting lines of code, I'm
                crafting clever puns and satire that would make even the most
                advanced AI chuckle. 😄
              </StyledParagraph>
              <StyledParagraph>
                💖 Let's Connect: Whether you're a fellow code sorcerer, a
                cyberpunk enthusiast, or just someone looking for a good laugh,
                let's connect and embark on a journey through the digital cosmos
                together! 🚀
              </StyledParagraph>
            </Card>
          </Col>
        </Row>
      </Card>
    </AboutContainer>
  );
};

export default About;
