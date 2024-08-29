import { title } from "process";

// Create variable with all static text blurbs for the tool
export const textBits = {
  en: {
    header: {
      title: "Simba Text assistant",
      subtitle:
        "A web-based tool and browser extension that generates summaries of German-language texts. It is designed to improve your reading experience or support you on your language learning journey.",
    },

    index: {
      about: {
        title: "AI-assisted text simplification",
        subtitle: `Our tools produce summaries of German-language text. They are designed to additionally simplify the summaries, by shortening the sentences and providing explanations for words.`,
        description: `Our models and code are open source. The goal of Simba is to reduce the complexity of online texts, therefore making them more accessible to a wide range of target groups. These target groups – non-native language users, adults with disabilities, for example – reflect a very heterogeneous group of people and we believe that it is only through collaboration that the tool can truly create simplifications that work for these different groups of people. Our aim is to grow our community by inviting researchers and professionals from the simplification world as well as dedicated users to collaborate and build upon our base model, and to bring in their expertise.
      `,
      },
      team: {
        title: "Learn more about the team",
        text: `Simba is an ongoing research project from the group “Public Interest AI” at the Humboldt Institute for Internet and Society. To learn more about our work, check out our website.`,
        button: {
          url: "https://www.hiig.de/en/project/public-interest-ai/",
          label: "Project website",
        },
      },
      plugin: {
        title: "Simba browser extension",
        subtitle: `Get summaries as you browse`,
        description: `Simba is available as a browser extension for Chrome and Firefox browsers. The extension runs in the browser and produces summaries of German-language text on web pages. The browser extension also offers the opportunity to submit your feedback on the summary that Simba produces.`,
        button: {
          url: "simba/extension",
          label: "Learn more about the extension",
        },
      },
      simplifier: {
        title: "Simba simplifier",
        subtitle: `Simplify the texts you need`,
        description: `The Simba Simplifier is a text-box based tool – insert your text on the left to get a summary on the right. The tool shortens and simplifies German text based on an AI model. Simply copy and paste the text you would like to have simplified and our tool will produce an output instantly.
      .`,
        button: {
          url: "simba/simplifier",
          label: "Go to simplifier",
        },
      },
    },
    simplifier: {
      title: "Simba simplifier",
      subtitle: `Insert text on the left to get a summary on the right. The tool shortens and simplifies German text based on an AI model.`,
      input: `Input`,
      promptText: `Simba is a research project on text simplification in German. Please read carefully the terms before submitting your data.`,
      promptButton: `I understood and agree to the terms.`,
      placeholderPromt: `Please accept the terms to continue.`,
      placeholderInput: `Type or paste text to be summarised.`,
      placeholderOutput: `Insert the text on the left that you want to be summarised.`,
      submit: `Generate summary`,
      loading: `Generating the summary for your custom text…`,
      error: `An error occurred while generating the summary.`,
      output: `Output`,
      feedback: `Leave us feedback:`,
      feedbackText: `Please provide a reason for your downvote.`,
      feedbackButton: `Submit`,
      feedbackLoading: `Submitting feedback…`,
      feedbackSuccess: `Thank you for your feedback.`,
      termsTitle: `Terms`,
      terms: [
        `Simba is an ongoing research project. All texts will be collected for further research, please do not submit any personal data.`,
        `Simba is in beta stage and may produce incorrect results, please verify important details.`,
      ],
    },
    extension: {
      about: {
        title: "Simba browser extension",
        subtitle: `Get summaries of German-language text on web pages as you browse`,
        description: `The Simba Text Assistant is a browser extension that produces summaries of German-language text on web pages. It is designed to additionally simplify the summaries, by shortening the sentences and providing explanations for words.`,
        subline: `The browser extension, also known as a plugin or add-on, is installed through the browser. An icon in the status bar of the browser will then provide you with additional features. The browser extension also allows you to to give your feedback on the summary that Simba produces.`,
      },
      download: [
        {
          slug: "firefox",
          title: "Download for Firefox",
          blurb: `Download Simba as a browser add-on for Firefox and start summarising webpages as you browse.`,
          button: {
            url: "https://addons.mozilla.org/en-US/firefox/addon/simba-text-assistant/",
            label: "Install Firefox Add-on",
          },
        },
        {
          slug: "chrome",
          title: "Download for Chrome",
          blurb: `Download Simba as a browser extension from the Chrome web store and start summarising webpages.`,
          button: {
            url: "https://chromewebstore.google.com/detail/simba-text-assistant/lllfbelghpclobblmackbkheabbhfdhf",
            label: "Install Chrome Extension",
          },
        },
      ],
      application: {
        title: "What to use it for",
        subtitle: `The Simba Browser Extension can be used on a variety of webpages
        in both Firefox and Chrome browsers.`,
        fields: {
          learning: {
            title: "Learning german",
            text: `Improve your language skills by simplifying online content.`,
          },
          accessibility: {
            title: "Creating accessible content",
            text: `Get suggestions for simplifying your online content.`,
          },
          overview: {
            title: "Getting an overview",
            text: `Read succinct overviews of longer, complex webpages.`,
          },
        },
      },
    },
  },
  de: {
    header: {
      title: "Simba: KI-unterstützte Textvereinfachung",
      subtitle: `Unsere Angebote helfen dir, deutsche Texte zu verstehen und in einfacher Sprache zusammenzufassen. Sie wurden entwickelt, um dein Leseerlebnis zu verbessern und dir beim Lernen der deutschen Sprache zu helfen.`,
    },

    index: {
      about: {
        title: "Warum KI-unterstützte Textvereinfachung?",
        subtitle: `Simba reduziert die Komplexität von deutschen Online-Texten, während die Kernbotschaft erhalten bleibt.`,
        description: `Unsere zwei Angebote ersetzen dafür lange Wörter mit kurzen Synonymen, kürzen Sätze und fügen Informationen hinzu, um Zusammenhänge zu erklären. Die Internet-App (Textvereinfacher) und die Browser-Erweiterung machen das mit Hilfe eines KI-Modells.
Unser Ziel ist es, so vielen unterschiedlichen Menschen wie möglich den Zugang zu Online-Texten und Informationen zu ermöglichen. Diese Zielgruppen – zum Beispiel nicht muttersprachliche Benutzer*innen, oder Erwachsene mit Behinderungen – sind eine sehr heterogene Gruppe von Menschen. Wir sind überzeugt, dass Zusammenarbeit der Schlüssel zur Verbesserung unserer Angebote ist. Deshalb laden wir Forscher*innen, Fachleute und engagierte Benutzer*innen ein, mit uns zu kooperieren. Mit ihrer Expertise können wir unser Basismodell weiterentwickeln und Vereinfachungen schaffen, die für verschiedene Menschengruppen geeignet sind. Unser KI-Modell und der Code sind Open Source.
Weitere Informationen, wie das Modell funktioniert und welche Daten wir verwendet haben, findest du hier. 
      `,
      },
      team: {
        title: "Wer ist das Team hinter Simba?",
        text: `Simba ist ein laufendes Forschungsprojekt der Gruppe „Public Interest AI“ am Humboldt Institut für Internet und Gesellschaft. Besuche unsere Website, um mehr über unsere Arbeit zu erfahren.`,
        button: {
          url: "https://www.hiig.de/en/project/public-interest-ai/",
          label: "Projektwebsite",
        },
      },
      plugin: {
        title: "Die Browser-Erweiterung",
        description: `Diese Browser-Erweiterung hilft dir beim Surfen im Internet. Sie fasst den Inhalt deutscher Webseiten automatisch für dich zusammen. Du kannst die Erweiterung in den Browsern von Chrome und Firefox verwenden.`,
        button: {
          url: "simba/extension?lang=de",
          label: "Mehr über die Erweiterung",
        },
      },
      simplifier: {
        title: "Der Textvereinfacher",
        description: `Diese Internet-App hilft dir, einen Text zu kürzen und zu vereinfachen. Füge deinen Text in das linke Feld ein. Dann wird eine einfache Zusammenfassung auf der rechten Seite erscheinen.`,
        button: {
          url: "simba/simplifier?lang=de",
          label: "Zum Vereinfacher",
        },
      },
    },
    simplifier: {
      title: "Simba Textvereinfacher",
      subtitle: `Füge einen Text ein, um eine Zusammenfassung zu erhalten. Unsere Internet-App kürzt und vereinfacht den Text basierend auf einem KI-Modell.`,
      input: `Eingabetext`,
      promptText: `Simba ist ein Forschungsprojekt zur Textvereinfachung. Bitte lesen Sie die Bedingungen sorgfältig durch, bevor Sie Daten senden.`,
      promptButton: `Ich habe verstanden und stimme den Bedingungen zu.`,
      placeholderPromt: `Bitte akzeptieren Sie die Bedingungen, um fortzufahren.`,
      placeholderInput: `Gebe den zu vereinfachenden Text ein.`,
      placeholderOutput: `Füge links einen Text ein, der zusammengefasst werden soll.`,
      submit: `Zusammenfassung erstellen`,
      loading: `Zusammenfassung wird generiert…`,
      error: `Beim Erstellen der Zusammenfassung ist ein Fehler aufgetreten.`,
      output: `Ausgabetext`,
      feedback: `Geben Sie uns Feedback:`,
      feedbackText: `Bitte nennen Sie uns einen Grund.`,
      feedbackButton: `Senden`,
      feedbackLoading: `Feedback wird gesendet…`,
      feedbackSuccess: `Vielen Dank für Ihre Rückmeldung.`,
      termsTitle: `Nutzungsbedingungen`,
      terms: [
        `Simba ist ein laufendes Forschungsprojekt. Alle Texte werden für weitere Forschungszwecke gesammelt, bitte keine persönlichen Daten übermitteln.`,
        `Simba befindet sich in der Beta-Phase und kann fehlerhafte Ergebnisse liefern, bitte wichtige Details überprüfen.`,
      ],
    },
    extension: {
      about: {
        title: "Simba Browsererweiterung",
        description: `Unsere kostenlose Browser-Erweiterung hilft dir beim Surfen im Internet. Sie fasst den Inhalt deutscher Webseiten für dich automatisch in vereinfachter Sprache zusammen. Die Erweiterung ist für die Internetbrowser Chrome und Firefox verfügbar.`,
        subline: `Eine Browser-Erweiterung wird auch manchmal als “Add-on” oder Plug-in bezeichnet. Das ist ein kleines Programm, das du in deinem Internet-Browser installierst. Danach siehst du ein Symbol in der Statusleiste, mit dem du die Funktionen der Erweiterung aufrufen kannst. Du kannst ihr auch Feedback geben und sagen, ob du die Zusammenfassungen gut oder schlecht findest.`,
      },
      download: [
        {
          slug: "firefox",
          title: "Download für Firefox",
          blurb: `Lade Simba als Browser-Add-On für Firefox herunter.`,
          button: {
            url: "https://addons.mozilla.org/en-US/firefox/addon/simba-text-assistant/",
            label: "Firefox Add-On installieren",
          },
        },
        {
          slug: "chrome",
          title: "Download für Chrome",
          blurb: `Lade Simba als Browser-Erweiterung aus dem Chrome Web Store herunter.`,
          button: {
            url: "https://chromewebstore.google.com/detail/simba-text-assistant/lllfbelghpclobblmackbkheabbhfdhf",
            label: "Chrome Erweiterung installieren",
          },
        },
      ],
      application: {
        title: "Für was kann ich die Browser-Erweiterung nutzen? ",
        subtitle: `Die Simba Browsererweiterung kann auf einer Vielzahl von Webseiten in Firefox- und Chrome-Browsern verwendet werden.`,
        fields: {
          learning: {
            title: "Deutsch lernen",
            text: `Verbessere deine Sprachkenntnisse, indem du Online-Inhalte vereinfachst.`,
          },
          accessibility: {
            title: "Barrierefreie Inhalte erstellen",
            text: `Erhalte Vorschläge zur Vereinfachung deiner Online-Inhalte.`,
          },
          overview: {
            title: "Einen Überblick erhalten",
            text: `Lese prägnante Zusammenfassungen von längerer und komplexen Webseiteninhalten`,
          },
        },
      },
    },
  },
};
