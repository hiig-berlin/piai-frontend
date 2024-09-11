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
        topics?: any;
        topics_DE?: any;
        search?: any;
      }
    | undefined
  >();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const urlLang = urlParams.get("lang");

      let initialLang = "en"; // default language

      if (urlLang) {
        initialLang = urlLang;
      } else {
        const storedLang = localStorage.getItem("selectedLang");
        if (storedLang) {
          initialLang = storedLang;
        }
      }

      setLanguage(initialLang);
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
      localStorage.setItem("selectedLang", language); // Update localStorage when language changes
    }
    setIsInitialLoad(false);
  }, [language, toolSlug, isInitialLoad]);

  return { strings, language, setLanguage };
};

export default useLanguage;