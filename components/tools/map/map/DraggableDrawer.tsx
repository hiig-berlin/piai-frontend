import React, { useEffect, useState } from "react";
import { useSpring, config, animated } from "react-spring";
import { useDrag } from "@use-gesture/react";
import styled from "styled-components";
import useIsMounted from "~/hooks/useIsMounted";
import { useToolStateContext } from "../context/ContextProviders";

const Container = styled.div`
  background: #000;
  pointer-events: all;
  height: 120vh;
`;

const DragHandle = styled.div`
  padding: var(--size-3) 0;
  display: flex;
  justify-content: center;
  touch-action: none;
`;

const Handle = styled.div`
  height: 5px;
  border-radius: 10px;
  background-color: #f0f;
  width: var(--size-6);
  cursor: pointer;
`;

export const DraggableDrawer = ({
  children,
  onFullHeightChange,
}: {
  children: React.ReactNode;
  onFullHeightChange: Function;
}) => {
  const isMounted = useIsMounted();
  const { updateFilterState } = useToolStateContext();
  const [{ y }, api] = useSpring(() => ({ y: 0 }));

  const [allowDrag, setAllowDrag] = useState(false);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    api.start({
      y: window.innerHeight * -0.5,
      config: {
        ...config.stiff,
        duration: 250,
      },
    });

    setTimeout(() => {
      if (isMounted) {
        setLastY(window.innerHeight * -0.5);
        setAllowDrag(true);
      }
    }, 250);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const open = (velocity = 0) => {
    if (typeof window === "undefined") return;

    api.start({
      y: window?.innerHeight * -1,
      immediate: false,
      config: { ...config.stiff, velocity, duration: 250 },
    });
    if (typeof onFullHeightChange === "function") onFullHeightChange(true);

    setTimeout(() => {
      if (isMounted) {
        setLastY(window.innerHeight * -1);
      }
    }, 250);
  };

  const close = (velocity = 0) => {
    if (typeof window === "undefined") return;

    api.start({
      y: 0,
      immediate: false,
      config: { ...config.stiff, velocity, duration: 250 },
    });
    if (typeof onFullHeightChange === "function") onFullHeightChange(false);
    setTimeout(() => {
      if (isMounted) {
        setLastY(0);
        updateFilterState({
          quickViewProjectId: null,
          isDrawerOpen: false,
        });
      }
    }, 250);
  };

  const bind = useDrag((state) => {
    if (typeof window === "undefined" || !allowDrag) return;

    const {
      active,
      movement: [, y],
      velocity: [, vy],
      offset: [, oy],
      lastOffset: [, loy],
      cancel,
    } = state;

    if (lastY + y < window?.innerHeight * -0.75 && y < 0) {
      cancel();

      if (active) open();

      return;
    }

    if (lastY + y > window?.innerHeight * -0.2) {
      cancel();

      if (active) close();

      return;
    }

    if (active) {
      let newY = window.innerHeight * -0.5 + y;
      if (lastY < window.innerHeight * -0.75) {
        newY = lastY + y;
      }

      api.start({
        y: Math.max(newY, window.innerHeight * -1),
        config: config.wobbly,
      });
    } else {
      cancel();
      let newY = window.innerHeight * -0.5;

      if (lastY < window.innerHeight * -0.75 && y < window.innerHeight * 0.25) {
        newY = window.innerHeight * -1;
        if (typeof onFullHeightChange === "function") onFullHeightChange(true);
      } else {
        if (typeof onFullHeightChange === "function") onFullHeightChange(false);
      }

      api.start({
        y: newY,
        config: config.stiff,
      });
      setTimeout(() => {
        if (isMounted) {
          setLastY(newY);
        }
      }, 250);
    }
  });

  return (
    <animated.div
      style={{
        position: "fixed",
        top: "100%",
        width: "100%",
        y,
      }}
    >
      <Container {...bind()}>
        <DragHandle>
          <Handle />
        </DragHandle>
        {children}
      </Container>
    </animated.div>
  );
};

export default DraggableDrawer;
