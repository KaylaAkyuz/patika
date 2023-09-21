import React from "react";
import { Card, Typography } from "antd";
import styled from "styled-components";

const { Title, Paragraph } = Typography;

const BlogContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 32px;
`;

const BlogPost = styled(Card)`
  width: 544px;
`;

const BlogImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  margin-right: 16px;
`;

const BlogContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const StyledTitle = styled(Title)`
  font-family: VT323, monospace;
  margin-top: 0;
`;

const StyledParagraph = styled(Paragraph)`
  font-family: VT323, monospace;
  flex: 1;
`;

const Blog = () => {
  return (
    <BlogContainer>
      <BlogPost
        bodyStyle={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <BlogImage
          src={`${process.env.PUBLIC_URL}/images/coding-blog-2.webp`}
          alt="Neon Coding"
        />
        <BlogContent>
          <StyledTitle level={3}>
            The Joy of Coding in a Neon-lit World 🌟
          </StyledTitle>
          <StyledParagraph>
            In the world of 0s and 1s, I find my sanctuary. Join me on a journey
            through the neon-lit streets of code, where creativity knows no
            bounds. From pixel-perfect designs to crafting clever algorithms,
            we'll explore it all.
          </StyledParagraph>
        </BlogContent>
      </BlogPost>
      <BlogPost
        bodyStyle={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <BlogImage
          src={`${process.env.PUBLIC_URL}/images/ai-blog.png`}
          alt="AI"
        />
        <BlogContent>
          <StyledTitle level={3}>Unraveling the Mysteries of AI 🤖</StyledTitle>
          <StyledParagraph>
            As a self-proclaimed AI explorer, I dive deep into the realms of
            artificial intelligence. From teaching machines to recognize cats to
            creating chatbots with a sense of humor, AI is my playground. Join
            me as we demystify the world of algorithms and machine learning.
          </StyledParagraph>
        </BlogContent>
      </BlogPost>
      <BlogPost
        bodyStyle={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <BlogImage
          src={`${process.env.PUBLIC_URL}/images/pixelart-blog.gif`}
          alt="Pixel Art"
        />
        <BlogContent>
          <StyledTitle level={3}>
            Code and Creativity: A Pixelated Love Story 🎨
          </StyledTitle>
          <StyledParagraph>
            Pixels are my passion, and I'm on a quest to infuse creativity into
            every byte. In this blog series, we'll explore the art of pixel
            painting, creating retro game graphics, and the magic of digital
            storytelling. Grab your pixel art tool and let's paint the town
            together!
          </StyledParagraph>
        </BlogContent>
      </BlogPost>
      <BlogPost
        bodyStyle={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <BlogImage
          src={`${process.env.PUBLIC_URL}/images/coding-blog-1.webp`}
          alt="Coding Satire"
        />
        <BlogContent>
          <StyledTitle level={3}>The Satirical Side of Coding 😄</StyledTitle>
          <StyledParagraph>
            Who said coding can't be fun? Join me as we navigate the world of
            programming with a sense of humor. From clever code jokes to
            debugging dilemmas, we'll share a laugh while mastering the craft.
            Stay tuned for witty anecdotes and satire that will tickle your
            programming funny bone!
          </StyledParagraph>
        </BlogContent>
      </BlogPost>
      <BlogPost
        bodyStyle={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <BlogImage
          src={`${process.env.PUBLIC_URL}/images/my-photo-2.jpg`}
          alt="Hairstyle Change"
        />
        <BlogContent>
          <StyledTitle level={3}>
            Changing Hairstyles: A Colorful Journey 🌈
          </StyledTitle>
          <StyledParagraph>
            During my internship, I decided to embark on a new adventure:
            changing my hairstyle and hair color. From vibrant purples to
            electric greens, I experimented with different looks to express my
            creativity. Join me as I share the joys and challenges of
            transforming my hair while pursuing my passion for coding!
          </StyledParagraph>
        </BlogContent>
      </BlogPost>
    </BlogContainer>
  );
};

export default Blog;
