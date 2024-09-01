import React from "react";
import styled from "styled-components";
import { ButtonNormalized } from "~/components/styled/Button";
import { Icon as LabeldIcon } from "~/components/tools/shared/ui/Icon";
import { SvgBackground } from "~/components/ui/SvgBackground";
import { DetailProps } from "~/components/tools/claimspotting/ui/types";

const Details: React.FC<DetailProps> = ({
  row,
  strings,
  handleClose,
}) => (
  <DetailsWrapper>
    <div className="row title">
      <h2>{strings?.title}</h2>
      <ButtonNormalized onClick={handleClose}>
        <SvgBackground type="close" />
      </ButtonNormalized>
    </div>
    <div className="row">
      <div className="column">
        <p>{row.Text}</p>
        <div className="row">
          <div className="column">
            <h3>{strings?.channel}</h3>
            <LabeldIcon type="channel">{row.Channel_Name}</LabeldIcon>
          </div>
          <div className="column">
            <h3>{strings?.members}</h3>
            <LabeldIcon type="group">{row.Member_count}</LabeldIcon>
          </div>
          <div className="column">
            <h3>{strings?.link}</h3>
            <LabeldIcon type="globe" url={row.Link}>
              {row.Link}
            </LabeldIcon>
          </div>
        </div>
      </div>
      <div className="column">
        <h3>{strings?.topic}</h3>
        <p>{row.Topic}</p>
        <h3>{strings?.narrative}</h3>
        <p>{row.Narratives}</p>

        {row.Siblings.length > 0 && <h3>{strings?.twins}</h3>}
        {row.Siblings.map((sibling: any, idx: number) => (
          <LabeldIcon type="copy" url={sibling} key={idx}>
            {sibling}
          </LabeldIcon>
        ))}
      </div>
    </div>
  </DetailsWrapper>
);
export default Details;

const DetailsWrapper = styled.div`
  padding: var(--size-3);
  border-radius: var(--size-2);
  margin: 0 calc(var(--size-3) * -1 - var(--size-2));
  border: solid var(--color-bg-tool);
  border-width: var(--size-2);
  font-size: 0.9em;
  line-height: 1.4;
  color: #fff;
  display: flex;
  flex-direction: column;

  // Add triangle to top/center of the box
  position: relative;
  &:before {
    content: "";
    position: absolute;
    top: calc(var(--size-2) * -1);
    left: 47%;
    transform: translateX(-50%);
    border-width: var(--size-2);
    border-style: solid;
    border-color: black transparent transparent transparent;
  }

  p {
    margin: 0;
  }

  .row {
    display: flex;
    gap: var(--size-6);

    &.title {
      justify-content: space-between;

      span {
        min-width: var(--size-3);
      }
    }
  }

  .column {
    display: flex;
    flex-direction: column;
    gap: var(--size-1);

    h3 {
      margin-top: var(--size-3);
      &:first-of-type {
        margin-top: 0;
      }
    }

    .row {
      margin-top: var(--size-3);
    }
  }
`;
