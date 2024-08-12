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
      download: {
        firefox: {
          title: "Download for Firefox",
          blurb: `Download Simba as a browser add-on for Firefox and start summarising webpages as you browse.`,
          button: {
            url: "https://addons.mozilla.org/en-US/firefox/addon/simba-text-assistant/",
            label: "Install Firefox Add-on",
          },
        },
        chrome: {
          title: "Download for Chrome",
          blurb: `Download Simba as a browser extension from the Chrome web store and start summarising webpages.`,
          button: {
            url: "https://chromewebstore.google.com/detail/simba-text-assistant/lllfbelghpclobblmackbkheabbhfdhf",
            label: "Install Chrome Extension",
          },
        },
      },
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
        }
      },
    },
  },
  de: {
    header: {
      title: "Simba Text Assistent",
      subtitle: `Eine Anwendung und ein Erweiterung für den Browser fasst für Sie deutsche Texte zusammen. So wird das Lesen einfacher und Sie lernen die Sprache schneller.`,
    },
    
    index: {
      about: {
        title: "Simba – KI-unterstützte Textvereinfachung",
        subtitle: `Der Simba Text Assistant ist eine Browsererweiterung und Webseite, die Zusammenfassungen deutscher Texte auf Webseiten erstellt. Die Zusammenfassungen werden zusätzlich vereinfacht, indem die Sätze verkürzt und Erklärungen für Wörter bereitgestellt werden. Der Simba Text Assistant wurde für deutsche Texte entwickelt, funktioniert aber möglicherweise auch für andere Sprachen.
      .`,
        description: `Simba wurde von Mitgliedern der Forschungsgruppe „Public Interest AI“ am Humboldt Institut für Internet und Gesellschaft erstellt. Unsere Modelle und unser Code sind Open Source. Ziel von Simba ist es, die Komplexität von Online-Texten zu reduzieren und sie so für eine breite Zielgruppe zugänglicher zu machen. Diese Zielgruppen – nicht muttersprachliche Benutzer, Erwachsene mit Behinderungen, zum Beispiel – sind eine sehr heterogene Gruppe von Menschen und wir glauben, dass es nur durch Zusammenarbeit möglich ist, dass das Tool wirklich Vereinfachungen schafft, die für diese verschiedenen Gruppen von Menschen funktionieren. Unser Ziel ist es, unsere Community zu erweitern, indem wir Forscher und Fachleute aus der Vereinfachungswelt sowie engagierte Benutzer einladen, zusammenzuarbeiten und auf unserem Basismodell aufzubauen und ihre Expertise einzubringen.
      `,
      },
      team: {
        title: "Erfahren Sie mehr über das Team",
        text: `Simba ist ein laufendes Forschungsprojekt der Gruppe „Public Interest AI“ am Humboldt Institut für Internet und Gesellschaft. Besuchen Sie unsere Website, um mehr über unsere Arbeit zu erfahren.`,
        button: {
          url: "https://www.hiig.de/en/project/public-interest-ai/",
          label: "Projektwebsite",
        },
      },
      plugin: {
        title: "Simba Browsererweiterung",
        subtitle: `Erhalten Sie Zusammenfassungen während des Surfens`,
        description: `Simba ist als Browsererweiterung für Chrome- und Firefox-Browser verfügbar. Die Erweiterung läuft im Browser und erstellt Zusammenfassungen deutscher Texte auf Webseiten. Die Browsererweiterung bietet auch die Möglichkeit, Ihr Feedback zur Zusammenfassung abzugeben, die Simba erstellt.`,
        button: {
          url: "simba/extension?lang=de",
          label: "Mehr über die Erweiterung",
        },
      },
      simplifier: {
        title: "Simba Textvereinfacher",
        subtitle: `Vereinfachen Sie die Texte, die Sie benötigen`,
        description: `Der Simba Textvereinfacher ist ein textbasiertes Tool – fügen Sie Ihren Text links ein, um eine Zusammenfassung rechts zu erhalten. Das Tool kürzt und vereinfacht deutschen Text basierend auf einem KI-Modell. Kopieren Sie einfach den Text, den Sie vereinfacht haben möchten, und unser Tool wird sofort ein Ergebnis liefern.`,
        button: {
          url: "simba/simplifier?lang=de",
          label: "Zum Vereinfacher",
        },
      },
    },
    simplifier: {
      title: "Simba Textvereinfacher",
      subtitle: `Fügen Sie einen Text ein, um eine Zusammenfassung zu erhalten. Das Tool kürzt und vereinfacht deutschen Text basierend auf einem KI-Modell.`,
      input: `Eingabe`,
      promptText: `Simba ist ein Forschungsprojekt zur Textvereinfachung. Bitte lesen Sie die Bedingungen sorgfältig durch, bevor Sie Daten senden.`,
      promptButton: `Ich habe verstanden und stimme den Bedingungen zu.`,
      placeholderPromt: `Bitte akzeptieren Sie die Bedingungen, um fortzufahren.`,
      placeholderInput: `Geben Sie den zu vereinfachenden Text ein.`,
      placeholderOutput: `Fügen Sie Text ein, der zusammengefasst werden soll.`,
      submit: `Zusammenfassung erstellen`,
      loading: `Zusammenfassung wird generiert…`,
      error: `Beim Erstellen der Zusammenfassung ist ein Fehler aufgetreten.`,
      output: `Ergebnis`,
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
        subtitle: `Erhalten Sie Zusammenfassungen deutscher Texte auf Webseiten, während Sie surfen`,
        description: `Der Simba Text Assistant ist eine Browsererweiterung, die Zusammenfassungen deutscher Texte auf Webseiten erstellt. Die Zusammenfassungen werden zusätzlich vereinfacht, indem die Sätze verkürzt und Erklärungen für Wörter bereitgestellt werden.`,
        subline: `Die Browsererweiterung, auch bekannt als Plugin oder Add-on, wird über den Browser installiert. Ein Symbol in der Statusleiste des Browsers bietet Ihnen zusätzliche Funktionen. Die Browsererweiterung bietet auch die Möglichkeit, Ihr Feedback zur Zusammenfassung abzugeben, die Simba erstellt.`,
      },
      download: {
        firefox: {
          title: "Download für Firefox",
          blurb: `Laden Sie Simba als Browser-Add-On für Firefox herunter und beginnen Sie, Webseiten zusammenzufassen, während Sie surfen.`,
          button: {
            url: "https://addons.mozilla.org/en-US/firefox/addon/simba-text-assistant/",
            label: "Firefox Add-On installieren",
          },
        },
        chrome: {
          title: "Download für Chrome",
          blurb: `Laden Sie Simba als Browsererweiterung aus dem Chrome Web Store herunter und beginnen Sie, Webseiten zusammenzufassen.`,
          button: {
            url: "https://chromewebstore.google.com/detail/simba-text-assistant/lllfbelghpclobblmackbkheabbhfdhf",
            label: "Chrome Erweiterung installieren",
          },
        },
      },
      application: {
        title: "Wofür Sie es verwenden können",
        subtitle: `Die Simba Browsererweiterung kann auf einer Vielzahl von Webseiten in Firefox- und Chrome-Browsern verwendet werden.`,
        fields: {
          learning: {
            title: "Deutsch lernen",
            text: `Verbessern Sie Ihre Sprachkenntnisse, indem Sie Online-Inhalte vereinfachen.`,
          },
          accessibility: {
            title: "Barrierefreie Inhalte erstellen",
            text: `Erhalten Sie Vorschläge zur Vereinfachung Ihrer Online-Inhalte.`,
          },
          overview: {
            title: "Einen Überblick erhalten",
            text: `Lesen Sie prägnante Übersichten längerer, komplexer Webseiten.`,
          },
        }
      },
    },
  },
};
