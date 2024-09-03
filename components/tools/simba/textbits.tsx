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
        description:
          "Our goal is to make online texts and information accessible to as many diverse individuals as possible. These target groups — such as non-native speakers or adults with disabilities — are highly varied. We believe that collaboration is key to enhancing our offerings. Therefore, we invite researchers, professionals, and engaged users to work with us. Their expertise will help us refine our base model and create simplifications suitable for different groups. Our AI model and code are open source. For more information on how the model works and the data we use, please visit the [about page](/tool/simba/about).",
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
        subtitle: "Simplify as you browse",
        description: `Our free browser extension assists you while browsing the internet. It automatically summarises the content of German websites in simplified language. The extension is available for the Chrome and Firefox browsers.`,
        subline: `A browser extension is a small programme that you install in your web browser. Once installed, you'll see an icon in the status bar that allows you to access the extension's features. You can also provide feedback on whether you find the summaries helpful or not.`,
        note: "Important Information: Our browser extension scans the first 2,600 words on a webpage to provide a simplified summary. If you wish to simplify and summarise a longer German text, please use our online app (Text Simplifier), and split the text up into smaller parts.",
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
            title: "Create accessible content",
            text: `Receive suggestions for making your online content more accessible.`,
          },
          overview: {
            title: "Get an overview",
            text: `Read concise summaries of longer and more complex web pages.`,
          },
        },
      },
    },
    about: {
      intro:
        "Our tools assist you in understanding German texts by summarising them in simplified language. They are designed to enhance your reading experience and support you learning  the German language.",
      cta: {
        title: "Collaborate with us",
        text: `<p>Our goal is to make online texts and information accessible to as many diverse individuals as possible. These target groups — such as non-native speakers or adults with disabilities — are highly varied. We believe that collaboration is key to enhancing our offerings. Therefore, we invite researchers, professionals, and engaged users to work with us. Their expertise will help us refine our base model and create simplifications suitable for different groups. Our AI model and code are open source.</p>`,
        url: "mailto:simba@hiig.de",
        label: "Write us an email",
      },
      content:{
        definition:{
          title: "What is Simba?",
          text: `We have developed two AI-powered tools designed to help people understand German online texts. The first is a web app that allows you to simplify your own texts. The second is a browser extension that automatically summarises texts on websites for you. Both use an AI-based language model to simplify German-language texts automatically.
          Simplification involves reducing complexity while retaining the core message. This means replacing longer words with shorter synonyms, shortening sentences, or adding extra information to clarify and explain context. The model that enables these simplifications has been trained and evaluated on news articles, making our tools particularly suited for this type of web content.
Our browser extension scans the first 2700 words on a webpage to provide a simplified summary. If you need to simplify and summarise a longer German text, you can use our web app (the text simplifier), which has no word limit for text analysis.
Please note that we cannot guarantee the model will always provide accurate information. Simba is based on a text generation model, which, like other generative models, can occasionally produce "hallucinations." Please compare the output with the input text to verify its accuracy. You can also provide feedback on how you find the summary created by our browser extension, helping us improve the AI model.`,
        },
        goal:{
          title: "What is the goal of Simba?",
          text: `Our AI-assisted text simplification tools were developed by members of the “Public Interest AI” research group at the Alexander von Humboldt Institute for Internet and Society. The overarching aim of the research group is to determine what characteristics AI in the public interest should have (you can read more about our thoughts at [publicinterest.ai](/)).
          We aim to implement these characteristics in practical prototypes. Simba is one such prototype. Specifically, this means that the code and models behind Simba are open source. This not only facilitates collaboration with others but also provides meaningful transparency about the system. Simba's functionality is also a step towards a larger goal that we see as serving the public interest: making online texts (and thus the internet) more accessible to everyone.`,
        },
        how:{
          title: "How does a summarisation model work in general?",
          text: `There are various methods to automatically create a summary. Simba is based on a “text generation model,” also known as Large Language Models or Foundation Models: ChatGPT and Llama are examples. These are very large neural networks trained on vast amounts of text data. They are trained to predict the next word in a sequence based on the likelihood.`,
        },
        data:{
          title: "Which data did we use?",
          text: `We used German-language newspaper articles that were simplified to fine-tune the Llama-3-8B-Instruct foundation model. We used articles from the Austria Presse Agentur, which were simplified by professional translators to levels B1 and A2 of the Common European Framework of Reference for Languages (CEFR). You can find a sample of the dataset [here](https://github.com/fhewett/apa-rst/tree/main/original_texts).`,
        },
        limitations:{
          title: "What do we know about Simba's limitations?",
          text: `Like all text generation models, and as shown in the sample texts, automatically generated summaries and simplifications may contain information that is not accurate. These are known as "hallucinations." We recommend comparing the input and output texts to ensure factual accuracy.
          The output may also contain repeated information. Our model has been fine-tuned on Austrian newspaper articles, meaning it performs best with this type of text and the outputs may contain linguistic features unique to Austrian German.`,
        },
        code:{
          title: "I have a specific question on the code, model or data…",
          text: `You can find our code repository [here](https://github.com/fhewett/simba) and a sample of the dataset [here](https://github.com/fhewett/apa-rst/tree/main/original_texts). If your question is not answered, feel free to file an issue on our [code repository](https://github.com/fhewett/simba).`,
        },
      },
      contentSimple:{
        what: {
          title: "What is Simba?",
          text: `Simba consists of two tools that help people understand German online texts. The first is a web app that allows you to simplify your own texts. The second is a browser extension that automatically summarises texts on websites for you. Both tools create a summary of the web page you are looking at. The tools also simplify the summary by shortening the sentences and explaining some words. The summary is created automatically and is not checked by a human.`,
        },
        help: {
          title: "You can help us make Simba better!",
          text: `We are still working on the tools and making them better. You can send us your feedback directly on the tools.
          The code used to create the tools can be looked at. This means that other people can see exactly how the tools were made. It also means that other people can use the code to make other tools.`,
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
Unser Ziel ist es, so vielen unterschiedlichen Menschen wie möglich den Zugang zu Online-Texten und Informationen zu ermöglichen. Diese Zielgruppen – zum Beispiel nicht muttersprachliche Benutzer:innen, oder Erwachsene mit Behinderungen – sind eine sehr heterogene Gruppe von Menschen. Wir sind überzeugt, dass Zusammenarbeit der Schlüssel zur Verbesserung unserer Angebote ist. Deshalb laden wir Forscher:innen, Fachleute und engagierte Benutzer*innen ein, mit uns zu kooperieren. Mit ihrer Expertise können wir unser Basismodell weiterentwickeln und Vereinfachungen schaffen, die für verschiedene Menschengruppen geeignet sind. Unser KI-Modell und der Code sind Open Source.
Weitere Informationen, wie das Modell funktioniert und welche Daten wir verwendet haben, findest du [hier](/tool/simba/about?lang=de). 
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
        subtitle: "Vereinfachen beim Surfen",
        description: `Unsere kostenlose Browser-Erweiterung hilft dir beim Surfen im Internet. Sie fasst den Inhalt deutscher Webseiten für dich automatisch in vereinfachter Sprache zusammen. Die Erweiterung ist für die Internetbrowser Chrome und Firefox verfügbar.`,
        subline: `Eine Browser-Erweiterung wird auch manchmal als “Add-on” oder Plug-in bezeichnet. Das ist ein kleines Programm, das du in deinem Internet-Browser installierst. Danach siehst du ein Symbol in der Statusleiste, mit dem du die Funktionen der Erweiterung aufrufen kannst. Du kannst ihr auch Feedback geben und sagen, ob du die Zusammenfassungen gut oder schlecht findest.`,
        note: `Wichtige Information: Unsere Browser-Erweiterung scannt nur die ersten 2600 Wörter auf einer Webseite, um diese vereinfacht zusammenzufassen. Falls du also einen längeren deutschsprachigen Text vereinfachen und zusammenfassen willst, kannst du dafür unsere Internet-App (Textvereinfacher) nutzen. Diese hat kein Wortlimit bei ihrer Analyse von Texten.`,
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
    about: {
      intro:
        "Unsere Angebote helfen dir, deutsche Texte zu verstehen und in einfacher Sprache zusammenzufassen. Sie wurden entwickelt, um dein Leseerlebnis zu verbessern und dir beim Lernen der deutschen Sprache zu helfen. ",
      cta: {
        title: "Arbeite mit uns zusammen",
        text: `Wir möchten so vielen unterschiedlichen Menschen wie möglich den Zugang zu Online-Texten und Informationen ermöglichen. Diese Zielgruppen – zum Beispiel nicht muttersprachliche Benutzer*innen, oder Erwachsene mit Behinderungen – sind eine sehr heterogene Gruppe von Menschen. Wir sind überzeugt, dass Zusammenarbeit der Schlüssel zur Verbesserung unserer Angebote ist. Deshalb laden wir Forscher*innen, Fachleute und engagierte Benutzer*innen ein, mit uns zu kooperieren. Mit ihrer Expertise können wir unser Basismodell weiterentwickeln und Vereinfachungen schaffen, die für verschiedene Menschengruppen geeignet sind. Unser KI-Modell und der Code sind Open Source.`,
        url: "mailto:piai@hiig.de",
        label: "Schreib uns eine E-Mail",
      },
      content:{
        definition:{
          title: "Was ist Simba?",
          text: `Wir haben zwei KI-unterstützte Angebote entwickelt, die Menschen helfen, deutsche Online-Texte zu verstehen. Das erste ist eine Internet-App, mit der du deine eigenen Texte vereinfachen kannst. Das andere ist eine Browser-Erweiterung, die automatisch Texte auf Webseiten für dich zusammenfasst. Beide verwenden ein KI-basiertes Sprachmodell, um deutschsprachige Texte automatisch zu vereinfachen.  

  Vereinfachung bedeutet, die Komplexität zu reduzieren, während die Kernbotschaft erhalten bleibt. Dabei werden längere Wörter durch kürzere Synonyme ersetzt, Sätze verkürzt oder zusätzliche Informationen eingefügt, um Zusammenhänge aufzuzeigen und zu erklären. Das Modell, das diese Vereinfachungen ermöglicht, wurde mit Nachrichtenartikeln trainiert und evaluiert. Deshalb sind unsere Angebote besser für diese Art von Webinhalten geeignet. 

  Unsere Browser-Erweiterung scannt die ersten 2600 Wörter auf einer Webseite, um diese vereinfacht zusammenzufassen. Falls du also einen längeren deutschsprachigen Text vereinfachen und zusammenfassen willst, kannst du dafür unsere Internet-App (der Textvereinfacher) nutzen. Diese hat kein Wortlimit bei ihrer Analyse von Texten. 

  Bitte beachte, dass wir nicht garantieren können, dass das Modell immer korrekte Informationen liefert. Simba basiert auf einem Textgenerierungsmodell, und wie andere Generierungsmodelle kann es in einigen Fällen „halluzinieren“. Bitte vergleiche die Ausgabe mit dem Eingabetext, um den Inhalt zu überprüfen. Du kannst unserer Browser-Erweiterung auch Feedback geben, wie du die erstellte Zusammenfassung findest. Damit hilfst du uns, das KI-Modell zu verbessern.`,
        },
        goal:{
          title: "Was ist das Ziel von Simba?",
          text: `Unsere KI-unterstützten Angebote für Textvereinfachung wurden von Mitgliedern der Forschungsgruppe “Public Interest AI” am Alexander von Humboldt Institut für Internet und Gesellschaft entwickelt. Das übergeordnete Ziel der Forschungsgruppe ist es, herauszuarbeiten, welche Eigenschaften sogenannte KI im öffentlichen Interesse bzw. gemeinwohlorientierte KI haben sollte (unsere Gedanken dazu findest du auf publicinterest.ai). 
          
  Wir möchten diese Eigenschaften auch in praktischen Prototypen umsetzen. Simba ist einer davon. Konkret bedeutet dies, dass der Code und die Modelle hinter Simba Open Source sind. Das ermöglicht  nicht nur eine Zusammenarbeit mit andern, sondern bietet auch eine sinnvolle Transparenz über das System. Die Funktionalität von Simba ist auch ein Schritt in Richtung eines größeren Ziels, das wir im öffentlichen Interesse sehen: Online-Texte (und damit das Internet) zugänglicher für alle Menschen zu machen. 
          `,
        },
        how:{
          title: "Wie funktioniert ein Zusammenfassungsmodell im Allgemeinen?",
          text: `Es gibt verschiedene Methoden, um automatisch eine Zusammenfassung zu erstellen. Simba basiert auf einem sogenannten „Textgenerierungsmodell“. Diese Textgenerierungsmodelle werden auch als Large Language Models oder Foundation Models bezeichnet: ChatGPT und Llama sind Beispiele dafür. Es handelt sich um sehr große neuronale Netzwerke, die mit einer großen Menge an Textdaten gefüttert werden. Diese Netzwerke werden darauf trainiert, zu berechnen, welches Wort in einer Sequenz am wahrscheinlichsten als nächstes kommt.`,
        },
        data:{
          title: "Welche Daten haben wir verwendet?",
          text: `Wir haben deutschsprachige Zeitungsartikel verwendet, die vereinfacht wurden, um das Foundation-Modell Llama-3-8B-Instruct feinabzustimmen. Wir nutzen Artikel der Austria Presse Agentur, die von professionellen Übersetzer*innen vereinfacht wurden. Sie sind auf die Niveaus B1 und A2 des Gemeinsamen Europäischen Referenzrahmens für Sprachen (GER) vereinfacht. Eine Stichprobe des Datensatzes findest du [hier](https://github.com/fhewett/apa-rst/tree/main/original_texts).`,
        },
        limitations:{
          title: "Was wissen wir über die Einschränkungen von Simba?",
          text: `Wie bei allen Textgenerierungsmodellen, und wie in den Beispieltexten zu sehen ist, können die automatisch generierten Zusammenfassungen und Vereinfachungen Informationen enthalten, die nicht der Wahrheit entsprechen. Diese werden auch  „Halluzinationen“ genannt. Wir empfehlen, den Eingabe- und Ausgabetext zu vergleichen, um sicherzustellen, dass die Ausgabe faktisch korrekt ist. 

Die Ausgabe kann auch wiederholte Informationen enthalten. Wir haben unser Modell auf Zeitungsartikel aus Österreich abgestimmt, was bedeutet, dass unser Modell mit diesem Texttyp am besten funktioniert und die Ausgaben sprachliche Merkmale enthalten können, die einzigartig für das österreichische Deutsch sind.`,
        },
        code:{
          title: "Ich habe eine spezifische Frage zu Code, Modell oder Daten…",
          text: `Unser Code-Repository findest du [hier](https://github.com/fhewett/simba) und eine Stichprobe des Datensatzes [hier](https://github.com/fhewett/apa-rst/tree/main/original_texts). Wenn deine Frage nicht beantwortet wird, kannst du gerne ein Issue in unserem [Code-Repository](https://github.com/fhewett/simba) erstellen.`,
        },
      },
      contentSimple:{
        what: {
          title: "What is Simba?",
          text: `Simba consists of two tools that help people understand German online texts. The first is a web app that allows you to simplify your own texts. The second is a browser extension that automatically summarises texts on websites for you. Both tools create a summary of the web page you are looking at. The tools also simplify the summary by shortening the sentences and explaining some words. The summary is created automatically and is not checked by a human.`,
        },
        help: {
          title: "You can help us make Simba better!",
          text: `We are still working on the tools and making them better. You can send us your feedback directly on the tools.
          The code used to create the tools can be looked at. This means that other people can see exactly how the tools were made. It also means that other people can use the code to make other tools.`,
        },
      },
    },
  },
};
