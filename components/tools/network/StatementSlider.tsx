import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { statementList } from "~/assets/data/tools/network/statementList";
import Image from 'next/image';
import { Box } from '~/components/tools/shared/ui/Box';
import { useAutoSlider } from "~/hooks/useAutoSlider"; 

const StatementSlider = ({ className }: { className: string }) => {
  const [isHovered, setIsHovered] = useState(false);

  const { index: currentIndex, goTo } = useAutoSlider({
    length: statementList.length,
    pause: isHovered,
    duration: 7000,
  });

  return (
    <SliderContainer
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
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
      {statementList.map((_, idx) => (
          <Dot
            key={idx}
            active={idx === currentIndex}
            onClick={() => goTo(idx)}
          />
        ))}
      </DotsContainer>
    </SliderContainer>
  );
};

export default StatementSlider;

const SliderContainer = styled(Box)`
  width: 100%;
  overflow: hidden;
  position: relative;
  padding: 0 0 var(--size-4);

  ${({ theme }) => theme.breakpoints.tablet} {
    padding: 0 0 var(--size-3);
  }
`;

const SliderTrack = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  width: 100%;
`;

const Slide = styled.div`
  min-width: 100%;
  padding: var(--size-4) var(--size-4) 0;
  box-sizing: border-box;
  // text-align: center;

  ${({ theme }) => theme.breakpoints.tablet} {
    padding: var(--size-3) var(--size-3) 0;
  }
`;

const StatementBox = styled.div`
  display: block;


    ${({ theme }) => theme.breakpoints.tabletLandscape} {
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
