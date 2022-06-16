import React, { useState } from "react";
import styled from "styled-components";
import { ButtonNormalized } from "../styled/Button";
import PageMargins from "./PageMargins";
import { SvgBackground } from "./SvgBackground";

const ToggleButton = styled(ButtonNormalized)`
  width: 100%;
  padding-right: 50px;
  text-align: left;
  background: salmon;
  padding: 10px;
  display: flex;
  justify-content: space-between;
`;

const Icon = styled.div`
  background-color: #f0f;
  width: 20px;
  height: 20px;
`;

export const Accordion = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <PageMargins>
      <div
        style={{
          maxWidth: "800px",
          background: "#ccc",
        }}
      >
        <h3>
          <ToggleButton
            id="accordion-header-1"
            aria-expanded={activeIndex == 0 ? "true" : false}
            aria-controls="accordion-panel-1"
            onClick={() => {
              setActiveIndex(0);
            }}
          >
            Item 1
            <Icon aria-hidden="true">
              <SvgBackground type="logo" />
            </Icon>
          </ToggleButton>
        </h3>
        <section
          id="accordion-panel-1"
          aria-labelledby="accordion-header-1"
          hidden={activeIndex !== 0}
        >
          <p>
            Pellentesque tristique nisl ut lectus maximus, eget euismod sapien
            blandit. Pellentesque eget molestie neque. Nulla hendrerit congue
            sapien, quis maximus magna cursus nec. Praesent viverra tellus
            massa, vitae mollis massa blandit in. Donec mattis ut arcu et
            ultrices. Maecenas posuere sem odio, eu molestie justo luctus sed.
            Quisque pulvinar, arcu ac posuere sodales, augue risus accumsan
            odio, eleifend tincidunt purus enim et lectus. Nullam blandit ac
            nisi ac bibendum.
          </p>
        </section>

        <h3>
          <ToggleButton
            id="accordion-header-2"
            aria-expanded={activeIndex == 1 ? "true" : false}
            aria-controls="accordion-panel-2"
            onClick={() => {
              setActiveIndex(1);
            }}
          >
            Item 2
            <Icon aria-hidden="true">
              <SvgBackground type="logo" />
            </Icon>
          </ToggleButton>
        </h3>
        <section
          id="accordion-panel-2"
          aria-labelledby="accordion-header-2"
          hidden={activeIndex != 1}
        >
          <p>
            Proin libero ante, dignissim sit amet turpis a, pretium condimentum
            dolor. Suspendisse sit amet volutpat velit. In ut est ac erat
            euismod malesuada non id velit. Vivamus tincidunt bibendum odio, a
            fermentum tellus sodales quis. Nunc at commodo tortor, id rutrum
            nunc. Vivamus condimentum vel nunc et congue.
          </p>
        </section>
        <h3>
          <ToggleButton
            id="accordion-header-3"
            aria-expanded={activeIndex == 2 ? "true" : false}
            aria-controls="accordion-panel-3"
            onClick={() => {
              setActiveIndex(2);
            }}
          >
            Item 3
            <Icon aria-hidden="true">
              <SvgBackground type="logo" />
            </Icon>
          </ToggleButton>
        </h3>
        <section
          id="accordion-panel-3"
          aria-labelledby="accordion-header-3"
          hidden={activeIndex != 2}
        >
          <p>
            Quisque molestie dapibus libero non pellentesque. Vivamus quam arcu,
            dictum quis hendrerit eget, lobortis eu felis. Nulla felis velit,
            ornare ac porttitor ut, rhoncus eu ipsum. Donec auctor efficitur est
            vel congue. Nunc at nunc quis massa facilisis fermentum. Vivamus
            fringilla nunc vitae justo consectetur, aliquam gravida nisl mollis.
            Nulla facilisi.
          </p>
        </section>
      </div>
    </PageMargins>
  );
};
