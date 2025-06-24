import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { statementList } from "~/assets/data/tools/network/statementList";
import Image from 'next/image';

const StatementSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === statementList.length - 1 ? 0 : prev + 1
    );
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <SliderContainer>
      <SliderTrack style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {statementList.map((item, index) => (
          <Slide key={index}>
            <StatementBox>
              <AuthorImage
                src={item.image}
                alt={item.author}
                width={100}
                height={100}
              />
              <TextBlock>
                <StatementText>{item.statement}</StatementText>
                <Author>{item.author}</Author>
                <Affiliation>{item.affiliation}</Affiliation>
              </TextBlock>
            </StatementBox>
          </Slide>
        ))}
      </SliderTrack>
      <DotsContainer>
        {statementList.map((_, index) => (
          <Dot
            key={index}
            active={index === currentIndex}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </DotsContainer>
    </SliderContainer>
  );
};

export default StatementSlider;

const SliderContainer = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
`;

const SliderTrack = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  width: 100%;
`;

const Slide = styled.div`
  min-width: 100%;
  // padding: 20px;
  box-sizing: border-box;
  // text-align: center;
`;

const StatementBox = styled.div`
  display: block;

  @media (min-width: 768px) {
    display: flex;
    align-items: center;
    gap: var(--size-4, 1rem);
  }
`;

const AuthorImage = styled(Image)`
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
`;

const TextBlock = styled.div`
  max-width: 600px;
`;

const StatementText = styled.p`
  margin-bottom: 0.5rem;
`;

const Author = styled.span`
  display: block;
  font-weight: bold;
`;

const Affiliation = styled.span`
  display: block;
  font-style: italic;
  color: gray;
`;


const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

const Dot = styled.button<{ active: boolean }>`
  width: 8px;
  height: 8px;
  margin: 0 5px;
  border-radius: 50%;
  border: none;
  background-color: ${({ active }) => (active ? '#aaa' : '#ccc')};
  cursor: pointer;
  transition: background-color 0.3s ease;
  padding: 0;
`;
