import React, { useEffect, useId, useState } from "react";
import styled from "styled-components";
import safeHtml from "~/utils/sanitize";

import { useRanger } from "~/hooks/useRanger";

const Container = styled.div`
  margin-top: var(--size-3);
`;

const SliderContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: var(--size-3);
  padding-bottom: var(--size-1);
`;

const Slider = styled.div`
  width: calc(100% - 2 * var(--size-3) - 2 * var(--size-4));
`;

const Value = styled.div`
  width: var(--size-4);
`;

export const Track = styled.div`
  transform: translateY(-3px);
  display: inline-block;
  height: 4px;
  width: 100%;
`;

export const Tick = styled.div`
  :before {
    content: "";
    position: absolute;
    left: 0;
    background: var(--color-dark-grey);
    height: 16px;
    width: 2px;
    transform: translate(-50%, -6px);
  }
`;

export const TickLabel = styled.div`
  position: absolute;
  font-size: 0.6rem;
  color: rgba(0, 0, 0, 0.5);
  top: 100%;
  transform: translate(-50%, 1.2rem);
  white-space: nowrap;
`;

export const Segment = styled.div<{ index: number }>`
  background: ${(props) =>
    props.index === 0
      ? "var(--color-medium-grey)"
      : props.index === 1
      ? "#fff"
      : props.index === 2
      ? "var(--color-medium-grey)"
      : "var(--color-medium-grey)"};
  height: 100%;
`;

export const Handle = styled.div<{ active: boolean }>`
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border-radius: 100%;
  font-size: 0.7rem;
  white-space: nowrap;
  color: white;
  cursor: pointer;
`;

const H4 = styled.h4`
  margin-top: 0;
  margin-bottom: 0.5em;
`;

export const RangeSlider = ({
  label,
  min,
  max,
  initialValueFrom,
  initialValueUntil,
  stepSize,
  updateState,
}: {
  label: string;
  min: number;
  max: number;
  initialValueFrom: number;
  initialValueUntil: number;
  stepSize: number;
  updateState: (values: number[]) => void;
}) => {
  const id = useId();
  const [values, setValues] = useState([initialValueFrom, initialValueUntil]);

  const { getTrackProps, ticks, segments, handles } = useRanger({
    min,
    max,
    stepSize,
    values,
    tickSize: 1,
    onDrag: setValues,
    onChange: updateState,
  } as any);

  useEffect(() => {
    setValues([initialValueFrom, initialValueUntil]);
  }, [initialValueFrom, initialValueUntil])
  
  return (
    <Container>
      <H4>{safeHtml(label)}</H4>
      <SliderContainer>
        <Value>{values[0]}</Value>
        <Slider>
          <Track {...(getTrackProps() as any)}>
            {ticks.map(({ value, getTickProps }: any, i: number) => (
              <Tick {...(getTickProps() as any)} key={`${id}-tick-${i}`}>
                {/* <TickLabel>{value}</TickLabel> */}
              </Tick>
            ))}
            {segments.map(({ getSegmentProps }: any, i: number) => (
              <Segment
                {...(getSegmentProps() as any)}
                index={i}
                key={`${id}-segment-${i}`}
              />
            ))}
            {handles.map(
              ({ value, active, getHandleProps }: any, i: number) => (
                <button
                  key={`${id}-thumb-${i}`}
                  {...(getHandleProps({
                    style: {
                      appearance: "none",
                      border: "none",
                      background: "transparent",
                      outline: "none",
                    },
                  }) as any)}
                >
                  <Handle active={active} />
                </button>
              )
            )}
          </Track>
        </Slider>
        <Value>{values[1]}</Value>
      </SliderContainer>
    </Container>
  );
};
