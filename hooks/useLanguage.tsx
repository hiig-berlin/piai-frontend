import { stringify } from "querystring";
import { useState, useEffect } from "react";
import { text } from "stream/consumers";

const useLanguage = (toolSlug: string) => {
  const [language, setLanguage] = useState<string>("en");
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [strings, setStrings] = useState<
    | {
        header?: any;
        simplifier?: any;
        extension?: any;
        index?: any;
        about?: any;
        list?: any;
        trends?: any;
        search?: any;
      }
    | undefined
  >();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const urlLang = urlParams.get("lang");
      if (urlLang) {
        setLanguage(urlLang);
      }
    }
  }, []);

  useEffect(() => {
    const loadTextBits = async () => {
      try {
        const textBits = await import(
          `~/components/tools/${toolSlug}/textbits`
        );
        setStrings(language === "en" ? textBits.textBits.en : textBits.textBits.de);
      } catch (error) {
        console.error("Error loading textBits:", error);
        // setStrings(undefined);
      }
    };

    loadTextBits();

    if (!isInitialLoad) {
      window.history.replaceState({}, "", `?lang=${language}`);
    }
    setIsInitialLoad(false);
  }, [language, toolSlug, isInitialLoad]);

  return { strings, language, setLanguage };
};

export default useLanguage;
