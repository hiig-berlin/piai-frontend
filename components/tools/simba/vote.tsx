import React, { useState } from "react";
import { Button } from "~/components/styled/Button";
import styled from "styled-components";
import { set } from "lodash";
import { Placeholder } from "../shared/Styled";
import { Icon } from "../shared/ui/Icon";

// Add necessary varibles ClientIP currentUUID
const Vote = ({
  clientIP,
  currentUUID,
  strings,
}: {
  clientIP: string;
  currentUUID: string;
  strings: any;
}) => {
  const [comment, setComment] = useState<string>("");
  const [showComment, setShowComment] = useState<boolean>(false);
  const [voted, setVoted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // Function to handle upvote
  const handleUpvote = async () => {
    if (voted) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_SIMBA_API_FEEDBACK as string,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            browser_id: "simba_browser_application",
            url: window.location.href,
            meta_ip: clientIP,
            thumb: "up",
            uuid: currentUUID,
          }),
        }
      );

      if (response.ok) {
        setVoted(true);
        setLoading(false);
        console.log("Upvoted summary with UUID:", currentUUID);
      } else {
        console.error("API Error:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  // Function to handle downvote
  const handleDownvote = async () => {
    if (voted) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_SIMBA_API_FEEDBACK as string,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            browser_id: "simba_browser_application",
            url: window.location.href,
            meta_ip: clientIP,
            thumb: "dn",
            uuid: currentUUID,
            fnotes: comment,
          }),
        }
      );

      if (response.ok) {
        setVoted(true);
        setLoading(false);
        console.log(
          "Downvoted summary with UUID:",
          currentUUID,
          "and comment:",
          comment
        );
      } else {
        console.error("API Error:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  // Return the component if !voted otherwise return an thank you message
  return (
    <VoteWrapper>
      <h3>{strings?.feedback || "Leave us feedback:"}</h3>

      {voted || loading ? (
        loading ? (
          <Placeholder>
            {strings?.feedbackLoading || "Sending feedback…"}
          </Placeholder>
        ) : (
          <p>{strings?.feedbackSuccess || "Thank you for your feedback."}</p>
        )
      ) : !showComment ? (
        <>
          <Icon
            type="thumbsUp"
            name="upvote"
            onClick={handleUpvote}
            disabled={voted}
          />
          <Icon
            type="thumbsDown"
            name="downvote"
            onClick={() => setShowComment(true)}
            disabled={voted}
          />
        </>
      ) : (
        <>
          <textarea
            placeholder={
              strings?.feedbackText ||
              "Please provide a reason for your downvote."
            }
            value={comment}
            className="feebackNotes"
            onChange={(event) => setComment(event.target.value)}
          />
          <Button name="submit" onClick={handleDownvote} disabled={voted}>
            {strings?.feedbackButton || "Submit"}
            
          </Button>
        </>
      )}
    </VoteWrapper>
  );
};

export default Vote;

// Flex row, h3 to the left, Buttons to the right
// Margin top auto
// Buttons no margin bottom
// Textarea width 100%, displayed instead of buttons
// max height: button height

const VoteWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding-top: var(--size-4);
  opacity: 0.6;

  &:hover,
  &:focus,
  &:has(:focus) {
    opacity: 1;
  }

  h3 {
    margin-right: auto;
    flex: auto 0 0;
    padding-right: var(--size-2);
  }

  p {
    color: var(--color-piai-simba);
    font-size: 0.9em;
  }

  button {
    margin: 0 var(--size-2);
  }

  textarea.feebackNotes {
    width: 100%;
    max-height: 2.8em;
    min-height: unset;
    padding: var(--size-1) var(--size-2);
    border-radius: 5px;

    &::placeholder {
      font-size: 0.9em;
    }
  }
`;
