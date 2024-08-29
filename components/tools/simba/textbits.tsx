import { title } from "process";

// Create variable with all static text blurbs for the tool
export const textBits = {
  en: {
    header: {
      title: "Simba: AI-Powered Text Simplification",
      subtitle:
        "Our tools assist you in understanding German texts by summarising them in simplified language. They are designed to enhance your reading experience and support you learning the German language.",
    },

    index: {
      about: {
        title: "Why AI-Assisted Text Simplification?",
        subtitle: `Simba reduces the complexity of German online texts while retaining the core message. Our two tools replace long words with shorter synonyms, shorten sentences, and add information to clarify context. This is achieved through our web app (Text Simplifier) and browser extension, which utilise an AI model.`,
        description: `Our goal is to make online texts and information accessible to as many diverse individuals as possible. These target groups — such as non-native speakers or adults with disabilities — are highly varied. We believe that collaboration is key to enhancing our offerings. Therefore, we invite researchers, professionals, and engaged users to work with us. Their expertise will help us refine our base model and create simplifications suitable for different groups. Our AI model and code are open source.
For more information on how the model works and the data we use, please visit this page.`,
      },
      team: {
        title: "Who is the team behind Simba?",
        text: `Simba is an ongoing research project led by the "Public Interest AI" group at the Humboldt Institute for Internet and Society. Visit our website to learn more about our work.`,
        button: {
          url: "https://www.hiig.de/en/project/public-interest-ai/",
          label: "Project website",
        },
      },
      plugin: {
        title: "The Browser Extension",
        description: `The browser extension assists you while browsing the internet. It automatically summarises the content of German webpages for you. You can use the extension with both Chrome and Firefox browsers.`,
        button: {
          url: "simba/extension",
          label: "Learn more about the extension",
        },
      },
      simplifier: {
        title: "The Text Simplifier",
        description: `This online app assists you by shortening and simplifying a text. Paste your text into the box on the left-hand side, and a simplified summary will appear on the right-hand side.`,
        button: {
          url: "simba/simplifier",
          label: "Go to simplifier",
        },
      },
    },
    simplifier: {
      title: "Text Simplifier",
      subtitle: `Paste a text to receive a summary. Our web application condenses and simplifies the text using an AI model.`,
      input: `Input`,
      promptText: `Simba is a research project on text simplification in German. Please read carefully the terms before submitting your data.`,
      promptButton: `I understood and agree to the terms.`,
      placeholderPromt: `Please accept the terms to continue.`,
      placeholderInput: `Enter the text you would like to summarise and simplify.`,
      placeholderOutput: `Insert the text that you would like to have summarised in the input box.`,
      submit: `Generate summary`,
      loading: `Generating the summary for your custom text…`,
      error: `An error occurred while generating the summary.`,
      output: `Output`,
      feedback: `Leave us feedback:`,
      feedbackText: `Please provide a reason for your downvote.`,
      feedbackButton: `Submit`,
      feedbackLoading: `Submitting feedback…`,
      feedbackSuccess: `Thank you for your feedback.`,
      termsTitle: `Terms of Use`,
      terms: [
        `Simba is an ongoing research project. All texts are collected for further research purposes, so please do not submit personal data.`,
        `As Simba is currently in its beta phase, it may produce incorrect results; please ensure you verify any important details.`,
      ],
    },
    extension: {
      about: {
        title: "Browser Extension",
        description: `Our free browser extension assists you while browsing the internet. It automatically summarises the content of German websites in simplified language. The extension is available for the Chrome and Firefox browsers.`,
        subline: `A browser extension is a small programme that you install in your web browser. Once installed, you'll see an icon in the status bar that allows you to access the extension's features. You can also provide feedback on whether you find the summaries helpful or not.`,
      },
      download: [
        {
          slug: "firefox",
          title: "Download for Firefox",
          blurb: `Download Simba as a browser add-on for Firefox.`,
          button: {
            url: "https://addons.mozilla.org/en-US/firefox/addon/simba-text-assistant/",
            label: "Install Firefox Add-on",
          },
        },
        {
          slug: "chrome",
          title: "Download for Chrome",
          blurb: `Download Simba as a browser extension from the Chrome Web Store.`,
          button: {
            url: "https://chromewebstore.google.com/detail/simba-text-assistant/lllfbelghpclobblmackbkheabbhfdhf",
            label: "Install Chrome Extension",
          },
        },
      ],
      application: {
        title: "How can I use the browser extension?",
        subtitle: `The Simba Browser Extension can be used on a variety of webpages
        in both Firefox and Chrome browsers.`,
        fields: {
          learning: {
            title: "Learn German",
            text: `Enhance your language skills by simplifying online content.`,
          },
          accessibility: {
            title: "Creating accessible content",
            text: `Receive suggestions for making your online content more accessible.`,
          },
          overview: {
            title: "Get an overview",
            text: `Read concise summaries of longer and more complex web pages.`,
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
