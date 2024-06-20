import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Box } from "~/components/tools/shared/ui/Box";
import { Button } from "~/components/styled/Button";
import SafeHtmlDiv from "~/components/ui/SafeHtmlDiv";
import safeHtml from "~/utils/sanitize";
import { getClientIp } from "~/utils/getClientIP";
import { Meta } from "../map/Styled";
import Vote from "./vote";
import { Placeholder } from "../shared/Styled";
import { Icon } from "../shared/ui/Icon";
import { ToolSvgBackground } from "../shared/ToolSvgBackground";

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
  console.log(
    "data to be sent to API: ",
    // process.env.NEXT_PUBLIC_SIMBA_API_SUM,
    data
  );

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

const Simplifier = () => {
  // State variables
  const [currentOutput, setCurrentOutput] = useState<string>(
    "Insert the text on the left that you want to be summarised."
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [customText, setCustomText] = useState<string>("");
  const [termsAccepted, setTermsAccepted] = useState<boolean | undefined>();
  const [clientIP, setClientIP] = useState("");
  const [currentUUID, setCurrentUUID] = useState<string>("");
  const [showVote, setShowVote] = useState<boolean>(false);

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
        "Insert the text on the left that you want to be summarised."
      );
    } else {
      setLoading(true);
      setCurrentOutput("Generating the summary for your custom text…");

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
              ? "Type or paste text to be summarised."
              : "Please accept the terms to continue."
          }
          onBlur={handleCustomTextBlur}
          value={customText}
          className={termsAccepted ? "" : "disabled"}
          onChange={(event) => setCustomText(event.target.value)}
        />
        {!termsAccepted && (
          <>
            <p>
              Simba is a research project on text simplification in German.
              Please read carefully the terms below before submitting your data.
            </p>
            <Button name="terms" onClick={() => setTermsAccepted(true)}>
              I understood and agree to the terms.
            </Button>
          </>
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
          {showVote && <Vote clientIP={clientIP} currentUUID={currentUUID} />}
        </>
      )}
    </>
  );

  return (
    <SimplifyWrapper>
      <div className="intro">
        <ToolSvgBackground type="lion" />
        <h2>Simba simplifier</h2>
        <Meta col={1}>
          Insert text on the left to get a summary on the right. The tool
          shortens and simplifies German text based on an AI model.
        </Meta>
      </div>

      <div className="input">
        <h3>Input</h3>
        {renderInput()}
      </div>

      <div className="output" tabIndex={0}>
        {renderOutput()}
      </div>

      <div className="termsEN">
        <h3>Terms</h3>
        <ul>
          <li>
            Simba is an ongoing research project. All texts will be collected
            for further research, please do not submit any personal data.
          </li>
          <li>
            Simba is in beta stage and may produce incorrect results, please
            verify important details.
          </li>
        </ul>
      </div>
      <div className="termsDE">
        <h3>Nutzungsbedingungen</h3>
        <ul>
          <li>
            Simba ist ein Forschungsprojekt zur Textvereinfachung. Alle Texte
            werden für die weitere Forschung gesammelt, bitte keine persönlichen
            Daten übermitteln.
          </li>
          <li>
            Simba befindet sich in der Beta-Phase und kann fehlerhafte
            Ergebnisse liefern, bitte wichtige Details überprüfen.
          </li>
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
    "title"
    "termsEN"
    "termsDE"
    "input"
    "output";

  ${({ theme }) => theme.breakpoints.tabletLandscape} {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "title title"
      "input output"
      "termsEN termsDE";
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
    }
  }

  .input {
    grid-area: input;
  }

  .output {
    grid-area: output;
    font-family: var(--font-family-monospace);
    font-size: 0.9em;
    display: flex;
    flex-direction: column;

    // Make tabindex invisible
    &:focus {
      outline: none;
    }
  }

  .termsEN {
    grid-area: termsEN;
  }

  .termsDE {
    grid-area: termsDE;
    opacity: 0.6;
  }

  .intro p {
    max-width: unset;
  }

  .input {
    position: relative;

    textarea {
      min-height: 300px;

      /* Fade textarea and convert mouse pointer if not accepted terms */
      &.disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }

    /* Floating button centered over textarea to accept terms and continue with cursor pointer */
    button {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      cursor: pointer; /* Set cursor property explicitly */
    }
  }
`;
