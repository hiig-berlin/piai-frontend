import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Box } from "~/components/tools/shared/ui/Box";
import { Button } from "~/components/styled/Button";
import SafeHtmlDiv from "~/components/ui/SafeHtmlDiv";
import safeHtml from "~/utils/sanitize";
import Vote from "./vote";
import { Placeholder } from "../shared/Styled";
import { ToolSvgBackground } from "../shared/ToolSvgBackground";

import {
  useCssVarsStateIsTabletLandscapeAndUpState,
} from "~/components/state/CssVarsState";

// Function to fetch summary from API
const getSummary = async (input: string, clientIP: string) => {
  const regex = /(<([^>]+)>)/gi;
  const strippedText = input.replace(regex, " ");
  const data = {
    text: strippedText,
    browser_id: "simba_browser_application",
    url: window.location.href,
    meta_ip: clientIP,
  };
  console.log("data to be sent to API: ", data);

  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_SIMBA_API_SUM as string,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    // Check response status
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      console.error("API Error:", response.status, response.statusText);
      throw new Error("API Error");
    }
  } catch (error) {
    console.error("Fetch Error:", error);
    throw error;
  }
};

const Simplifier = ({strings}: {strings: any}) => {

  const isTabletLandscapeAndUp = useCssVarsStateIsTabletLandscapeAndUpState();
  
  const [currentOutput, setCurrentOutput] = useState<string>(
    strings?.placeholderOutput ||
      "Insert the text on the left that you want to be summarised."
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [customText, setCustomText] = useState<string>("");
  const [termsAccepted, setTermsAccepted] = useState<boolean | undefined>();
  const [clientIP, setClientIP] = useState("");
  const [currentUUID, setCurrentUUID] = useState<string>("");
  const [showVote, setShowVote] = useState<boolean>(false);

  // update strings variable to the selected language
  useEffect(() => {
    strings && setCurrentOutput(strings.placeholderOutput);
  }, [strings]);

  // Effect to update local storage when termsAccepted changes
  useEffect(() => {
    if (termsAccepted !== undefined) {
      localStorage.setItem("termsAccepted", JSON.stringify(termsAccepted));
    }
  }, [termsAccepted]);

  // Effect to check localStorage on page load
  useEffect(() => {
    const storedTermsAccepted = localStorage.getItem("termsAccepted");
    if (storedTermsAccepted !== null) {
      try {
        setTermsAccepted(JSON.parse(storedTermsAccepted));
      } catch (error) {
        console.error("Error parsing termsAccepted from localStorage:", error);
        setTermsAccepted(false); // Set to default value in case of parsing error
      }
    } else {
      setTermsAccepted(false); // Default value if not found in local storage
    }
  }, []);

  // Fetch client's IP address when the component mounts
  useEffect(() => {
    const fetchClientIp = async () => {
      try {
        const response = await fetch("/api/get-client-ip");
        const data = await response.json();
        setClientIP(data.ip);
        console.log("Client IP:", data);
      } catch (error) {
        console.error("Error fetching client IP:", error);
      }
    };
    fetchClientIp();
  }, []);


  // Handle blur event for custom text input
  const handleCustomTextBlur = async () => {
    if (customText.trim() === "") {
      setCurrentOutput(
        strings?.placeholderOutput ||
          "Insert the text on the left that you want to be summarised."
      );
      setShowVote(false);
    } else {
      setLoading(true);
      setCurrentOutput(
        strings?.loading || "Generating the summary for your custom text…"
      );

      try {
        const result = await getSummary(customText, clientIP);
        setCurrentOutput(result.output);
        setCurrentUUID(result.uuid);
        setShowVote(true);
      } catch (error) {
        console.error("Error:", error);
        setCurrentOutput("An error occurred while generating the summary.");
      } finally {
        setLoading(false);
      }
    }
  };

  // Render custom text input
  const renderInput = () => {
    return (
      <>
        <textarea
          placeholder={
            termsAccepted
              ? strings?.placeholderInput ||
                "Type or paste text to be summarised."
              : strings?.placeholderPromt ||
                "Please accept the terms to continue."
          }
          onBlur={handleCustomTextBlur}
          value={customText}
          className={termsAccepted ? "" : "disabled"}
          onChange={(event) => setCustomText(event.target.value)}
        />
        {(customText.trim() != "" && termsAccepted && !isTabletLandscapeAndUp) && (
             
             <Button
               name="generate"
               onClick={handleCustomTextBlur}
               disabled={true}
               // disabled={termsAccepted ? false : true}
             >
               {strings?.submit || "Generate summary"}
             </Button>
           )}
        {!termsAccepted && (
          <div className="prompt">
            <p>
              {strings?.promptText ||
                `Simba is a research project on text simplification in German.
              Please read carefully the terms below before submitting your data.`}
            </p>
            <Button name="terms" onClick={() => setTermsAccepted(true)}>
              {strings?.promptButton || "I understood and agree to the terms."}
            </Button>
          </div>
        )}
      </>
    );
  };

  // Render output based on loading state
  const renderOutput = () => (
    <>
      <h3>Output</h3>
      {loading ? (
        <Placeholder
          dangerouslySetInnerHTML={{ __html: safeHtml(currentOutput) }}
        />
      ) : (
        <>
          <SafeHtmlDiv html={currentOutput} />
          
          {(customText.trim() != "" && termsAccepted && isTabletLandscapeAndUp) && (
             
            <Button
              name="generate"
              onClick={handleCustomTextBlur}
              disabled={true}
              // disabled={termsAccepted ? false : true}
            >
              {strings?.submit || "Generate summary"}
            </Button>
          )}
          {showVote && (
            <Vote
              clientIP={clientIP}
              currentUUID={currentUUID}
              strings={strings}
            />  
          )}
        </>
      )}
    </>
  );

  return (
    <SimplifyWrapper>
      {/* Title */}
      <div className="intro">
        <ToolSvgBackground type="lion" />
        <h2>{strings?.title || "Simba simplifier"}</h2>
        <p>
          {strings?.subtitle ||
            `Insert text on the left to get a summary on the right. The tool
          shortens and simplifies German text based on an AI model.`}
        </p>
      </div>

      

      <div className="input">
        <h3>Input</h3>
        {renderInput()}
      </div>

      <div
        className={termsAccepted ? "output" : "output disabled"}
        tabIndex={0}
      >
        {renderOutput()}
      </div>

      <div className="terms">
        <h3>{strings?.termsTitle || "Terms"}</h3>
        <ul>
          {strings?.terms?.map((term: string, index: number) => (
            <li key={index}>{term}</li>
          ))}
        </ul>
      </div>
    </SimplifyWrapper>
  );
};

export default Simplifier;

// Styled component for Simplifier component
const SimplifyWrapper = styled(Box)`
  display: grid;
  gap: var(--size-4);
  grid-template-columns: 1fr;
  grid-template-areas:
    "title lang"
    "terms terms"
    "input input"
    "output output";

  ${({ theme }) => theme.breakpoints.tabletLandscape} {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    // span input row to take max width
    grid-template-rows: auto 1fr auto;
    grid-template-areas:
      "title title title lang"
      "input input output output"
      "terms terms terms terms";
    flex: 100% 1 1;
  }

  .intro {
    grid-area: title;
    // display the icon to the left and title and p next to it underneath each other
    // the icon spans the full height of the grid
    display: grid;
    grid-template-rows: auto auto;
    grid-template-columns: 4em auto;
    align-items: center;

    // Icon spanning both rows
    .svg {
      grid-row: 1 / -1; //
      font-size: 3em;
      width: 1em !important;

      // on hover make .svg shake its head with a slight turn animation
      &:hover {
        animation: turn 0.5s ease-in-out;
      }
    }

    h2 {
      grid-row: 1;
    }

    p {
      grid-row: 2;
      max-width: unset;
    }
  }

  .lang {
    grid-area: lang;
    display: flex;
    justify-content: flex-end;
    margin-bottom: var(--size-4);

    button {
      margin-left: var(--size-2);
    }
  }

  .input {
    grid-area: input;
    position: relative;

    textarea {
      min-height: 300px;
      font-size: 1em;

      ${({ theme }) => theme.breakpoints.tabletLandscape} {
        box-sizing: border-box;
        height: calc(100% - 12px - 5px - var(--text-h3-margin-bottom));
        // min-height: max(300px, );
      }

      /* Fade textarea and convert mouse pointer if not accepted terms */
      &.disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }

    & > button {
      margin: var(--size-3) 0 0 auto;
    }

    /* Floating button centered over textarea to accept terms and continue with cursor pointer */
    .prompt {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      cursor: pointer; /* Set cursor property explicitly */
      width: 70%;

      button {
        margin-left: 0;
        margin-bottom: 0;
      }
    }
  }

  .output {
    grid-area: output;
    font-family: var(--font-family-monospace);
    font-size: 1em;
    display: flex;
    flex-direction: column;
    
    // Make tabindex invisible
    &:focus {
      outline: none;
    }

    button {
      margin: auto 0 0 auto;
    }

    &.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  .terms {
    grid-area: terms;
  }
`;
