import { title } from "process";

export const textBits = {
  en: {
    header: {
      title: "Claimspotting – Monitoring misinformation",
      subtitle:
        "A web-based tool that monitors potential misinformation on Telegram. It is designed to assist fact-checkers.",
    },
    index: {
      statusMessages: {
        loadingPre: "Loading page",
        loadingPost: "of the claim list …",
        noData: "No data available",
        error:
          "Error loading data. Try to refresh the page, the server might be tempoarily at capacity.",
        copyResults: "Copy results to clipboard",
        copySuccess: "Copied table data to clipboard",
      },
      filter: {
        counter: {
          title: "Claim counter",
          of: "of",
          subtitle: "Posts filtered as potentially checkworthy",
        },
        daterange: {
          title: "Select date range",
          lastDays: "Last 3 days",
          lastWeek: "Last week",
          lastMonth: "Last month",
        },
        topics: {
          title: "Filter by topics or narrative",
          selectTopic: "Select topic",
          allTopics: "All topics",
          allNarratives: "All narratives",
        },
        attributes: {
          title: "Filter by attributes",
          polarising: "Polarising",
          sensational: "Sensational",
          highDiffusion: "High diffusion",
          manyTwins: "Many siblings",
        },
      },
      table: {
        columns: {
          date: "Date",
          text: "Text",
          channel: "Channel",
          topics: "Topic",
          narrative: "Narrative",
          attributes: "Attributes",
          reach: "Reach",
        },
        details: {
          title: "Post details",
          channel: "Channel",
          members: "Members",
          link: "Link to post",
          topic: "Topic",
          narrative: "Narrative",
          twins: "Siblings or copies",
        },
      },
    },
    search: {
      statusMessages: {
        loading: "Loading semantically identical posts …",
        noData:
          "No posts seem to match the search query. Try searching for something else.",
        error:
          "Error loading data. Try to refresh the page, the server might be tempoarily at capacity.",
      },
      input: {
        title: "Search for semantically identical texts",
        placeholder: "Enter query text to match against",
      },
      results: {
        title: "Posts that match the query text",
        columns: {
          date: "Date",
          channel: "Channel",
          link: "Link to post",
        },
        initial: "Please enter a search phrase to find matching posts.",
      },
      disclaimer: {
        title: "Please note",
        text: `**The search results are posts that are semantically identical to the query text. Even minor adjustments in the query text can impact the search results.**
  
 It is therefore a good idea to start with a query text that uses similar words and sentence structures as what you would expect on Telegram. If this approach does not deliver good results, alter the query text and work your way up.`,

        subheadline: "Details on the method",
        explanation: `The query text is matched against a database of Telegram posts. The matching is based on vector embeddings. This is different from a keyword search in that it does not require exact word matches. The search results can, for example, contain synonyms or paraphrases. `,
      },
    },
    trends: {
      filter: {
        daterange: {
          title: "Select date range",
          lastDays: "Last 3 days",
          lastWeek: "Last week",
          lastMonth: "Last month",
        },
        threshold: {
          title: "Select threshold",
          subtitle: "Minimum percentage of posts to be considered trending",
        },
        channels: {
          title: "Select channels",
          subtitle:
            "Select channels to include in the trending topics. If nothing is selected, all channels are included.",
          selectChannels: "Select channels",
          allChannels: "All channels",
        },
      },
      trendingTopics: {
        title: "Trending Topics",
        explanationPre:
          "The above graph shows the prevailing topics, meaning that they have at least once exceeded the threshold of ",
        explanationPost: "% in the respective period.",
        exclude: {
          title: "Excluded topics",
          label: "Topics below threshold",
        },
        tooltip: {
          title: "Number of posts published on",
          total: "Total posts on that date",
        },
      },
      trendingNarrratives: {
        title: "Trending Narratives",
        explanationPre:
          "The above table shows the prevailing narratives, meaning that they have at least once made up ",
        explanationPost: "% of that days total posts.",
        explanationNumbers: "Total shows the sum of posts over the queried time span. Peak is the highest number of posts on a single day.",
        exclude: {
          titleShow: "Show excluded narratives",
          titleHide: "Hide excluded narratives",
          label: "Narratives below threshold",
        },
        columns:{
          narrative: "Narrative",
          trend: "Trend",
          total: "Total",
          peak: "Peak",
        }
      },
    },
    topics: {
      Agriculture: "Agriculture",
      "Civil Rights": "Civil Right",
      Culture: "Culture",
      Defense: "Defense",
      "Domestic Commerce": "Domestic Commerce",
      Education: "Education",
      Energy: "Energy",
      Environment: "Environment",
      "European Union": "European Union",
      "Foreign Trade": "Foreign Trade",
      "Government Operations": "Government Operations",
      Health: "Health",
      Housing: "Housing",
      Immigration: "Immigration",
      "International Affairs": "International Affairs",
      Labor: "Labor",
      "Law and Crime": "Law and Crime",
      Macroeconomics: "Macroeconomics",
      "Non-thematic": "Non-thematic",
      Other: "Other",
      "Social Welfare": "Social Welfare",
      Technology: "Technology",
      Transportation: "Transportation",
    },
    topics_DE: {
      Landwirtschaft: "Agriculture",
      Bürgerrechte: "Civil Right",
      Kultur: "Culture",
      Verteidigung: "Defense",
      Binnenhandel: "Domestic Commerce",
      Bildung: "Education",
      Energie: "Energy",
      Umwelt: "Environment",
      "Europäische Union": "European Union",
      Außenhandel: "Foreign Trade",
      Staatsbetrieb: "Government Operations",
      Gesundheit: "Health",
      Wohnungswesen: "Housing",
      "Migration und Integration": "Immigration",
      "Internationale Angelegenheiten": "International Affairs",
      "Arbeit und Beschäftigung": "Labor",
      "Recht und Kriminalität": "Law and Crime",
      Makroökonomie: "Macroeconomics",
      "Kein Thema": "Non-thematic",
      Sonstiges: "Other",
      "Sozialstaat": "Social Welfare",
      Technologie: "Technology",
      Transport: "Transportation",
    },
    about: {
      intro:
        "A web-based tool that monitors potential misinformation on Telegram. It is designed to assist fact-checkers.",
      collaboration: {
        title: "Collaborate with Us",
        text: "The goal of Claimspotting is to support fact-checkers. The design of the application is based on empirical research into their workflows and selection criteria. However, there is still much to learn, and we believe the application can always be improved. If you have any suggestions or encounter any issues, please feel free to contact us. Additionally, if you think we have missed any Telegram channels that should be monitored, do let us know!",
        url: "mailto:piai@hiig.de",
        label: "Write us an email",
      },
      info: {
        basics: {
          title: "What is Claimspotting?",
          text: "Claimspotting is a specially developed monitoring application that supports fact-checkers in verifying online content on the Telegram news platform. The term ‘Claimspotting’ combines the English words ‘claim’ and ‘spotting’. In the context of the application, it refers to the targeted identification of claims that could potentially be misinformation. The aim of the AI application is to make the work of journalistic fact-checkers more efficient by automating the time-consuming process of monitoring Telegram channels.",
        },
        goal: {
          title: "How Does Claimspotting Work?",
          text: "The application automatically searches and monitors [around 200 Telegram channels daily](https://github.com/SamiNenno/Claimspotting/tree/main/Tele_Crawler/Utils/Telegram_Channels), which are either known for spreading misinformation or have been identified as problematic by experts. It identifies posts that exhibit characteristics commonly associated with misinformation, according to research. Once such posts are detected, Claimspotting marks and categorises them according to specific criteria. This allows fact-checkers to pinpoint potential misinformation and subsequently verify it.",
        },
        applications: {
          title: "What Can I Do with Claimspotting?",
          text: "Our AI application offers three main functions: 1) You can view posts from Telegram containing potential misinformation in a table. You can sort this content according to various criteria. 2) There is a search function that allows you to search the entire database of monitored Telegram posts. This way, you can find out if a particular claim is circulating in the observed channels. 3) There is also a dashboard that visualises trends in the data. For example, it shows which topics or narratives are particularly prevalent on a given day.",
        },
        categories: {
          title: "Categories",
          factuality: {
            title: "Factual Claims",
            text: "Various types of texts qualify as factual claims in the Claimspotting application. Primarily, factual claims are statements that assert a truth. This means they are statements that can be either true or false. They are not opinions or judgements of taste. Often, factual claims refer to evidence, such as links, quotations, numbers, etc.",
          },
          topics: {
            title: "Topics",
            text: "Our table displays 21 different topics, ranging from the environment to migration. Posts labelled as ‘No Topic’ have no specific theme, which may be the case if they are too short. Posts classified as ‘Other’ have a theme but do not fit into any of the 21 categories. The topics in the table are derived from the Comparative Agenda Project, which has been used for numerous research projects over the years. This project has defined various policy areas that we use as topic categories.",
          },
          narratives: {
            title: "Narratives",
            text: "By narratives, we mean typical misinformation narratives. We asked several fact-checkers which types of overarching narratives they frequently encounter. They provided us with a list of about 40 narratives. We condensed this list to about 20 narratives, as machine learning with 40 classes was too challenging. These narratives include statements like 'Immigrants are more criminal than Germans' or 'Electric cars are worse for the environment than combustion engine cars.' If a post supports one of these narratives, it is classified accordingly.",
          },
          polarisation: {
            title: "Polarising",
            text: "Polarising claims are those that create a clear friend-enemy distinction. They refer to specific national, ethnic, or religious groups or portray elites as enemies or perpetrators. We adopted the taxonomy and data from the [DeFaktS project](https://defakts.de/).",
          },
          sensationalism: {
            title: "Sensationalism",
            text: "Sensational claims are statements that are exaggerated to grab the reader's attention. This often occurs through the excessive use of capital letters or exclamation marks. We adopted the taxonomy and data from the [DeFaktS project](https://defakts.de/).",
          },
          siblings: {
            title: "Siblings",
            text: "Siblings are Telegram posts that are semantically identical in content but differ in wording, grammar, length, or other characteristics. They could also be called paraphrases. An important criterion for semantic identity during the annotation process was whether the posts could be verified by the same fact-checking article. In other words, if Telegram post A can be proven true or false based on certain evidence, and the same judgement can be made for post B with the same evidence, we speak of semantic identity between A and B.",
          },
          diffusion: {
            title: "High Diffusion",
            text: "We track the number of forwards and views of a post. These engagement metrics are provided by Telegram. When a post is forwarded at an unusually fast rate, we refer to it as high diffusion. We use outlier detection to identify this. Technically, we speak of high diffusion when a post’s forwards are three standard deviations above the average.",
          },
        },
        faq: {
          title: "FAQ",
          misinformation: {
            title:
              "Why do we refer to misinformation instead of disinformation in the AI application?",
            text: "Disinformation is usually understood as false information spread with harmful intent. However, with misinformation, these intentions do not matter. The reason we refer to misinformation rather than disinformation is that our AI application cannot predict the intent of the authors based on a text. No software application can do that. Whether the information is spread with harmful intent or simply because the person genuinely believes it is not something software can determine. Therefore, we only refer to misinformation, not disinformation.",
          },
          selection_criteria: {
            title: "Does Claimspotting detect misinformation?",
            text: "No, it does not. Detecting misinformation requires content verification, which is not the application's task, and we do not believe this should be done by software. What Claimspotting does is flag Telegram posts that meet certain criteria. These criteria are known from research and are often associated with misinformation. However, this does not mean that the content is actually misinformation. Therefore, we refer to potential misinformation. The application supports fact-checkers in monitoring such potential misinformation.",
          },
          channels: {
            title: "Which Telegram channels are monitored?",
            text: "**It is, of course,** not possible to monitor all Telegram channels, as there are simply too many. Moreover, this would be of little use since most channels are uninteresting regarding misinformation. Therefore, we specifically monitor channels that have previously undergone fact-checking and are known for spreading misinformation. Additionally, we have asked fact-checkers about channels they monitor. If you have suggestions for other channels that should be included or believe that a channel should be removed, please feel free to contact us. A complete list of monitored channels can be found [here](https://github.com/SamiNenno/Claimspotting/tree/main/Tele_Crawler/Utils/Telegram_Channels).",
          },
          other_channels: {
            title:
              "Why are other platforms like Facebook or Twitter not monitored?",
            text: "From a technical standpoint, it would be possible to monitor other platforms as well. The models work with texts, and although adjustments would be required for other formats, this is generally feasible. However, many platforms have tightened their restrictions in recent years on who is allowed to scrape data. For Facebook and Twitter, it is currently either not possible or very expensive to collect this data. We hope this will change soon so that we can monitor other platforms in the future.",
          },
          architecture: {
            title: "What are the individual components of Claimspotting?",
            text: "The Claimspotting application consists of three main components: a web scraper, several machine learning and statistical models, and a web interface. The web scraper accesses around 200 Telegram channels every two hours between 6 AM and 10 PM. This means you can always see the latest posts from these channels during the day. In the next step, various methods are applied to analyse the content of the posts. These methods are primarily based on machine learning and statistics and provide general information about each post. Finally, the data is transmitted via an API to the web interface, where it is displayed.",
          },
          limitations: {
            title:
              "What do we know about the limitations of the Claimspotting tool?",
            text: "Many of the criteria used to analyse the Telegram posts are identified by machine learning tools. Our models work well but are not perfect. Machine learning is always about probability, not certainty. You may find that you disagree with some messages' classification as supporting a particular narrative or falling under the suggested topic. The application aims to provide orientation amidst the abundance of content posted on Telegram. However, you should always double-check the results in each case.",
          },
          basemodels: {
            title:
              "On which models are the AI applications of Claimspotting based?",
            text: "The models used are customised [XLM-RoBERTa Large models](https://huggingface.co/FacebookAI/xlm-roberta-large). This model was trained on text files in more than 100 languages. Therefore, the Claimspotting models also work not just for German texts. The embedding models, i.e., the models used to recognise siblings, are based on a [different version](https://huggingface.co/intfloat/multilingual-e5-large-instruct) of XLM-RoBERTa and were also customised for the task with our own data.",
          },
          code: {
            title: "I have a specific question about the code or models...",
            text: "You can find our code repository [here](https://github.com/SamiNenno/Claimspotting), and the machine learning models [here](https://huggingface.co/Sami92). If your question is not answered, do not hesitate to create an issue in our Claimspotting repository.",
          },
        },
      },
    },
  },
  de: {
    header: {
      title: "Claimspotting – Monitoring misinformation",
      subtitle:
        "Ein webbasiertes Tool, das potenzielle Fehlinformationen auf Telegram überwacht. Es ist dazu konzipiert, Faktenchecker:innen zu helfen.",
    },
    index: {
      statusMessages: {
        loadingPre: "Lade Seite",
        loadingPost: "der gesamten Claim-Liste …",
        noData: "Keine Daten verfügbar",
        error:
          "Fehler beim Laden der Daten. Versuche die Seite neu zu laden, der Server könnte temporär überlastet sein.",
        copyResults: "Ergebnisse kopieren",
        copySuccess: "Gefilterte Einträge in die Zwischenablage kopiert",
      },
      filter: {
        counter: {
          title: "Claim Counter",
          of: "von",
          subtitle: "potenziell überprüfenswerten Beiträgen",
        },
        daterange: {
          title: "Zeitraum auswählen",
          lastDays: "Letzte 3 Tage",
          lastWeek: "Letzte Woche",
          lastMonth: "Letzter Monat",
        },
        topics: {
          title: "Nach Themen oder Narrativ filtern",
          selectTopic: "Thema auswählen",
          allTopics: "Alle Themen",
          allNarratives: "Alle Narrative",
        },
        attributes: {
          title: "Nach Attributen filtern",
          polarising: "Polarisierend",
          sensational: "Sensationalistisch",
          highDiffusion: "Hohe Diffusion",
          manyTwins: "Viele Siblings",
        },
      },
      table: {
        columns: {
          date: "Datum",
          text: "Text",
          channel: "Kanal",
          topics: "Thema",
          narrative: "Narrativ",
          attributes: "Attribute",
          reach: "Reichweite",
        },
        details: {
          title: "Details zum Beitrag",
          channel: "Kanal",
          members: "Mitglieder",
          link: "Link zum Beitrag",
          topic: "Thema",
          narrative: "Narrativ",
          twins: "Verwandte Posts oder Kopien",
        },
      },
    },
    search: {
      statusMessages: {
        loading: "Lade Beiträge mit dem gleichen Narrativ …",
        noData:
          "Es scheint keine Beiträge zu geben, die der Suchanfrage entsprechen. Versuche, nach etwas anderem zu suchen.",
        error:
          "Fehler beim Laden der Daten. Versuche die Seite neu zu laden, der Server könnte temporär überlastet sein.",
      },
      input: {
        title: "Suche nach einem Narrativ",
        placeholder: "Suche nach einem Narrativ",
      },
      results: {
        title: "Beiträge mit passendem Narrativ",
        columns: {
          date: "Datum",
          channel: "Kanal",
          link: "Link zum Beitrag",
        },
        initial:
          "Bitte gib eine Suchphrase ein, um passende Beiträge zu finden.",
      },
      disclaimer: {
        title: "Erklärung",
        text: `Die Suchergebnisse sind Beiträge, die semantisch identisch mit dem Suchtext sind. Der Suchtext wird mit einer Datenbank von Telegram-Beiträgen abgeglichen. Das Matching basiert auf Vektoreinbettungen. Dies unterscheidet sich von einer Stichwortsuche, da keine exakten Wortübereinstimmungen erforderlich sind. Die Suchergebnisse können beispielsweise Synonyme oder Paraphrasen enthalten.
        
  **Beachte jedoch, dass diese Anwendung empfindlich auf kleine Änderungen reagiert.**

  Selbst kleine Anpassungen im Suchtext können die Suchergebnisse beeinflussen. Es ist ratsam, mit einem Suchtext zu beginnen, der ähnliche Wörter und Satzstrukturen verwendet, wie du sie auf Telegram erwarten würdest. Wenn dieser Ansatz keine guten Ergebnisse liefert, füge kleine Änderungen zum Suchtext hinzu und arbeite dich vor.`,
      },
    },
    trends: {
      filter: {
        daterange: {
          title: "Zeitraum auswählen",
          lastDays: "Letzte 3 Tage",
          lastWeek: "Letzte Woche",
          lastMonth: "Letzter Monat",
        },
        threshold: {
          title: "Schwellenwert auswählen",
          subtitle:
            "Mindestprozentsatz an Beiträgen, um als Trending zu gelten",
        },
        channels: {
          title: "Kanäle auswählen",
          subtitle:
            "Wähle Kanäle aus, die in den Trending-Themen enthalten sein sollen. Wenn nichts ausgewählt ist, sind alle Kanäle enthalten.",
          selectChannels: "Kanäle auswählen",
          allChannels: "Alle Kanäle",
        },
      },
      trendingTopics: {
        title: "Bestimmende Themen",
        explanationPre:
          "Der obige Graph zeigt die vorherrschenden Themen, d.h. Themen, die mindestens einmal den Schwellenwert von ",
        explanationPost: "% im jeweiligen Zeitraum überschritten haben.",
        exclude: {
          title: "Ausgeblendete Themen",
          label: "Themen unter Schwellenwert",
        },
        tooltip: {
          title: "Anzahl der veröffentlichten Beiträge am",
          total: "Gesamtanzahl der Beiträge an diesem Tag",
        },
      },
      trendingNarrratives: {
        title: "Bestimmende Narrative",
        explanationPre:
          "Der obige Graph zeigt die vorherrschenden Narrative, d.h. Narrative, die mindestens einmal ",
        explanationPost: "% der täglichen Beiträge ausgemacht haben.",
        explanationNumbers: "Insges. zeigt die Summe der Beiträge über den abgefragten Zeitraum. Tages-Max zeigt den Tageshöchstwert über den angefragten Zeitraum.",
        exclude: {
          titleShow: "Narrative unter Schwellenwert anzeigen",
          titleHide: "Narrative unter Schwellenwert ausblenden",
          label: "Narrative unter Schwellenwert",
        },
        columns:{
          narrative: "Narrativ",
          trend: "Zeitliche Entwicklung",
          total: "Insges.",
          peak: "Tages-Max",
        }
      },
    },
    topics: {
      Agriculture: "Landwirtschaft",
      "Civil Rights": "Bürgerrechte",
      Culture: "Kultur",
      Defense: "Verteidigung",
      "Domestic Commerce": "Binnenhandel",
      Education: "Bildung",
      Energy: "Energie",
      Environment: "Umwelt",
      "European Union": "Europäische Union",
      "Foreign Trade": "Außenhandel",
      "Government Operations": "Staatsbetrieb",
      Health: "Gesundheit",
      Housing: "Wohnungswesen",
      Immigration: "Migration und Integration",
      "International Affairs": "Internationale Angelegenheiten",
      Labor: "Arbeit und Beschäftigung",
      "Law and Crime": "Recht und Kriminalität",
      Macroeconomics: "Makroökonomie",
      "Non-thematic": "Kein Thema",
      Other: "Sonstiges",
      "Social Welfare": "Sozialstaat",
      Technology: "Technologie, Wissenschaft und Kommunikation",
      Transportation: "Transport",
    },
    topics_DE: {
      Landwirtschaft: "Landwirtschaft",
      Bürgerrechte: "Bürgerrechte",
      Kultur: "Kultur",
      Verteidigung: "Verteidigung",
      Binnenhandel: "Binnenhandel",
      Bildung: "Bildung",
      Energie: "Energie",
      Umwelt: "Umwelt",
      "Europäische Union": "Europäische Union",
      Außenhandel: "Außenhandel",
      Staatsbetrieb: "Staatsbetrieb",
      Gesundheit: "Gesundheit",
      Wohnungswesen: "Wohnungswesen",
      "Migration und Integration": "Migration und Integration",
      "Internationale Angelegenheiten": "Internationale Angelegenheiten",
      "Arbeit und Beschäftigung": "Arbeit und Beschäftigung",
      "Recht und Kriminalität": "Recht und Kriminalität",
      Makroökonomie: "Makroökonomie",
      "Kein Thema": "Kein Thema",
      Sonstiges: "Sonstiges",
      "Sozialstaat": "Sozialstaat",
      Technologie: "Technologie, Wissenschaft und Kommunikation",
      Transport: "Transport",
    },
    about: {
      intro:
        "Ein webbasiertes Tool, das potenzielle Fehlinformationen auf Telegram überwacht. Es ist dazu konzipiert, Faktenchecker:innenn zu helfen.",
      collaboration: {
        title: "Arbeite mit uns zusammen",
        text: "Das Ziel von Claimspotting ist es, Faktenchecker:innen zu unterstützen. Das Design der Anwendung basiert auf empirischer Forschung über deren Arbeitsabläufe und Auswahlkriterien. Es gibt jedoch noch viel zu lernen, und wir glauben, dass die Anwendung immer verbessert werden kann. Wenn Du Vorschläge hast oder auf Fehler stößt, nimm gerne Kontakt mit uns auf. Auch wenn Du denkst, dass wir einige Telegram-Kanäle verpasst haben, die in die Überwachung aufgenommen werden sollten, lass es uns bitte wissen!",
        url: "mailto:piai@hiig.de",
        label: "Schreib uns eine Mail",
      },
      info: {
        basics: {
          title: "Was ist Claimspotting?",
          text: "Claimspotting ist eine speziell entwickelte Überwachungsanwendung, die Faktenchecker:innen bei der Überprüfung von Online-Inhalten auf der Nachrichtenplattform Telegram unterstützt. Der Begriff „Claimspotting“ setzt sich aus den englischen Wörtern „claim“ (Behauptung) und „spotting“ (Entdecken) zusammen. Im Kontext der Anwendung bedeutet dies das gezielte Erkennen von Behauptungen, die potenziell Fehlinformationen sein könnten. Ziel der KI-Anwendung ist es, die Arbeit von journalistischen Faktenchecker:innen effizienter zu gestalten, indem sie den zeitaufwendigen Prozess der Überwachung von Telegram-Kanälen automatisiert.",
        },
        goal: {
          title: "Wie funktioniert Claimspotting?",
          text: "Die Anwendung durchsucht und überwacht täglich automatisch um die [200 Telegram-Kanäle](https://github.com/SamiNenno/Claimspotting/tree/main/Tele_Crawler/Utils/Telegram_Channels), die entweder für die Verbreitung von Fehlinformationen bekannt sind oder von Expert:innen als problematisch eingestuft wurden. Es identifiziert Beiträge, die Merkmale aufweisen, die in der Forschung als typisch für Fehlinformationen gelten. Sobald solche Beiträge erkannt werden, markiert und kategorisiert Claimspotting sie nach bestimmten Kriterien. Dadurch können Faktenchecker:innen gezielt potenzielle Fehlinformationen finden und diese anschließend überprüfen.",
        },
        applications: {
          title: "Was kann ich mit Claimspotting machen?",
          text: "Unsere KI-Anwendung bietet drei Hauptfunktionen: 1) Du kannst dir Beiträge von Telegram mit potenziellen Fehlinformationen in einer Tabelle anzeigen lassen. Diese Inhalte kannst du nach verschiedenen Kriterien sortieren. 2) Es gibt eine Suchfunktion. Damit kannst du die gesamte Datenbasis der überwachten Telegram-Beiträge durchsuchen. So kannst du herausfinden, ob eine bestimmte Behauptung in den beobachteten Kanälen kursiert. 3) Es gibt auch ein Dashboard, das Trends in den Daten visualisiert. Es zeigt zum Beispiel, welche Themen oder Narrative an einem bestimmten Tag besonders häufig vorkommen.",
        },
        categories: {
          title: "Kategorien",
          factuality: {
            title: "Faktenbehauptungen",
            text: "Für die Claimspotting Anwendung qualifizieren sich verschiedene Textarten als Faktenbehauptungen. Vor allem sind Faktenbehauptungen Behauptungen mit Wahrheitsanspruch. Das bedeutet, dass es sich um Aussagen handelt, die wahr oder falsch sein können. Sie sind keine Meinungen oder Geschmacksurteile. Oft machen Faktenbehauptungen Bezug auf Beweise, wie z.B. Links, Zitate, Zahlen usw.",
          },
          topics: {
            title: "Themen",
            text: "Unsere Tabelle zeigt 21 verschiedene Themen an. Diese reichen von Umwelt bis Migration. Beiträge, die als Kein Thema gekennzeichnet sind, haben kein spezifisches Thema. Das kann zum Beispiel der Fall sein, wenn sie zu kurz sind. Beiträge, die als Sonstiges klassifiziert sind, haben ein Thema, das jedoch in keine der 21 Kategorien passt. Die Themen in der Tabelle stammen aus dem Comparative Agenda Project, das seit Jahren für zahlreiche Forschungsprojekte genutzt wird. Dieses Projekt hat verschiedene Politikbereiche definiert, die wir als Themenkategorien verwenden.",
          },
          narratives: {
            title: "Narrative",
            text: "Mit Narrativen meinen wir typische Fehlinformationsnarrative. Wir haben mehrere Faktenchecker:innen gefragt, welche Arten von übergreifenden Narrativen sie häufig antreffen. Sie haben uns daraufhin eine Liste von etwa 40 Narrativen gegeben. Diese Liste haben wir auf etwa 20 Narrative kondensiert, da maschinelles Lernen mit 40 Klassen zu schwierig war. Zu diesen Narrativen gehören zum Beispiel Aussagen wie “Einwanderer sind krimineller als Deutsche” oder “Elektroautos sind schlechter für die Umwelt als Autos mit Verbrennungsmotor”. Wenn ein Beitrag eines dieser Narrative unterstützt, wird er entsprechend klassifiziert",
          },
          polarisation: {
            title: "Polarisierend",
            text: "Polarisierende Behauptungen sind solche, die eine klare Freund-Feind-Unterscheidung schaffen. Sie beziehen sich auf bestimmte nationale, ethnische oder religiöse Gruppen oder stellen Eliten als Feinde oder Täter dar. Wir haben die Taxonomie und Daten aus dem [DeFaktS-Projekt](https://defakts.de/) übernommen.",
          },
          sensationalism: {
            title: "Sensationalistisch",
            text: "Sensationelle Behauptungen sind Aussagen, die in übertriebener Weise formuliert sind, um die Aufmerksamkeit der Leser:innen zu erregen. Dies geschieht oft durch den hohen Gebrauch von Großbuchstaben oder Ausrufezeichen. Wir haben die Taxonomie und Daten aus dem [DeFaktS-Projekt](https://defakts.de/) übernommen.",
          },
          siblings: {
            title: "Siblings",
            text: "Siblings sind Telegram-Beiträge, die inhaltlich semantisch identisch sind, sich aber in Wortwahl, Grammatik, Länge oder anderen Merkmalen unterscheiden. Man könnte sie auch als Paraphrasen bezeichnen. Ein wichtiges Kriterium für die semantische Identität während des Annotierungsprozesses war, ob die Beiträge durch denselben Faktencheck-Artikel verifiziert werden könnten. Mit anderen Worten: Wenn Telegram-Beitrag A anhand bestimmter Beweise als wahr oder falsch erwiesen werden kann und für Beitrag B dasselbe Urteil mit denselben Beweisen getroffen werden kann, sprechen wir von semantischer Identität zwischen A und B.",
          },
          diffusion: {
            title: "Hohe Diffusion",
            text: "Wir verfolgen die Anzahl der Weiterleitungen (Forwards) und Aufrufe/Ansichten (Views) eines Beitrags. Diese Engagement-Metriken werden von Telegram bereitgestellt. Wenn ein Beitrag in ungewöhnlich schneller Geschwindigkeit weitergeleitet wird, sprechen wir von hoher Diffusion. Um dies zu erkennen, verwenden wir Outlier-Detection. Technisch gesehen sprechen wir von hoher Diffusion, wenn die Forwards eines Beitrags drei Standardabweichungen über dem Durchschnitt liegen.",
          },
        },
        faq: {
          title: "FAQ",
          misinformation: {
            title:
              "Warum sprechen wir bei der KI-Anwendung von Fehlinformation/Misinformation anstatt von Desinformation?",
            text: "Desinformation wird in der Regel als falsche Information verstanden, die mit schädlicher Absicht verbreitet wird. Bei Fehlinformationen/Misinformation spielen diese Absichten jedoch keine Rolle. Der Grund, warum wir von Fehlinformationen und nicht von Desinformation sprechen, liegt darin, dass unsere KI-Anwendung die Absicht der Autor:innen basierend auf einem Text nicht vorhersagen kann. Keine Software-Anwendung ist dazu in der Lage. Ob die Information mit schädlicher Absicht verbreitet wird oder einfach, weil die Person wirklich daran glaubt, ist für Software-Anwendungen nicht erkennbar. Deshalb beziehen wir uns nur auf Fehlinformationen und nicht auf Desinformation.",
          },
          selection_criteria: {
            title: "Deckt Claimspotting Fehlinformationen auf?",
            text: "Nein, das tut es nicht. Um Fehlinformationen aufzudecken, muss der Inhalt verifiziert werden. Das ist nicht die Aufgabe der Anwendung, und wir glauben auch nicht, dass dies von einer Software-Anwendung übernommen werden sollte. Was Claimspotting macht, ist, Telegram-Beiträge zu markieren, die bestimmte Kriterien erfüllen. Diese Kriterien sind aus der Forschung bekannt und stehen oft im Zusammenhang mit Fehlinformationen. Das bedeutet jedoch nicht, dass der Inhalt tatsächlich Fehlinformation ist. Daher sprechen wir von potenziellen Fehlinformationen. Die Anwendung unterstützt Faktenchecker:innen dabei, solche potenziellen Fehlinformationen zu überwachen.",
          },
          channels: {
            title: "Welche Telegram-Kanäle werden überwacht?",
            text: "Es ist natürlich nicht möglich, alle Telegram-Kanäle zu überwachen, da es einfach zu viele gibt. Außerdem wäre dies wenig hilfreich, da die meisten Kanäle in Bezug auf Fehlinformationen uninteressant sind. Wir überwachen daher gezielt Kanäle, die bereits zuvor einer Faktenprüfung unterzogen wurden und für die Verbreitung von Fehlinformationen bekannt sind. Zusätzlich haben wir Faktenchecker:innen nach Kanälen gefragt, die sie beobachten. Wenn du Vorschläge für weitere Kanäle hast, die aufgenommen werden sollten, oder der Meinung bist, dass ein Kanal entfernt werden sollte, melde dich gerne bei uns. Eine vollständige Liste der überwachten Kanäle findest du [hier](https://github.com/SamiNenno/Claimspotting/tree/main/Tele_Crawler/Utils/Telegram_Channels).",
          },
          other_channels: {
            title:
              "Warum werden andere Plattformen wie Facebook oder Twitter nicht beobachtet?",
            text: "Aus technischer Sicht wäre es möglich, auch andere Plattformen zu überwachen. Die Modelle arbeiten mit Texten, und obwohl Anpassungen für andere Formate erforderlich wären, ist das grundsätzlich machbar. Allerdings haben viele Plattformen in den letzten Jahren ihre Beschränkungen verschärft, wer Daten scrapen darf. Für Facebook und Twitter ist es derzeit entweder nicht möglich oder sehr teuer, diese Daten zu erfassen. Wir hoffen, dass sich dies bald ändert, sodass wir in Zukunft auch andere Plattformen überwachen können.",
          },
          architecture: {
            title: "Was sind die einzelnen Komponenten Claimspotting?",
            text: "Die Claimspotting-Anwendung besteht aus drei Hauptkomponenten: einem Web-Scraper, mehreren maschinellen Lern- und statistischen Modellen sowie einer Web-Oberfläche. Der Web-Scraper greift alle zwei Stunden, zwischen 6 Uhr morgens und 22 Uhr abends, auf etwa 200 Telegram-Kanäle zu. Das bedeutet, dass du tagsüber immer die neuesten Beiträge aus diesen Kanälen sehen kannst. Im nächsten Schritt werden verschiedene Methoden zur Analyse des Inhalts der Beiträge angewendet. Diese Methoden basieren hauptsächlich auf maschinellem Lernen und Statistik und liefern allgemeine Informationen zu jedem einzelnen Beitrag. Schließlich werden die Daten über eine API an die Web-Oberfläche übermittelt, die sie anzeigt.",
          },
          limitations: {
            title:
              "Was wissen wir über die Einschränkungen des Claimspotting-Tools?",
            text: "Viele der Kriterien, die zur Analyse der Telegram-Beiträge verwendet werden, werden durch maschinelle Lernwerkzeuge identifiziert. Unsere Modelle funktionieren gut, sind aber nicht perfekt. Beim maschinellen Lernen geht es immer um Wahrscheinlichkeit, nicht um Gewissheit. Es kann vorkommen, dass du bei einigen Nachrichten nicht zustimmst, dass sie ein bestimmtes Narrativ unterstützen oder unter das vorgeschlagene Thema fallen. Die Anwendung soll eine Orientierung in der Fülle von Inhalten bieten, die auf Telegram gepostet werden. Dennoch solltest du die Ergebnisse im Einzelfall immer doppelt überprüfen.",
          },
          basemodels: {
            title:
              "Auf welchen Modellen basieren die KI-Anwendungen von ClaimSpotting?",
            text: "Die benutzten Modelle sind von uns angepasste [XLM-RoBERTa Large Modelle](https://huggingface.co/FacebookAI/xlm-roberta-large). Dieses Modell wurde auf Textdateien in mehr als 100 Sprachen trainiert. Deswegen funktionieren die Claimspotting Modelle auch nicht nur für deutsche Texte. Die Embedding Modelle, also die Modelle mit denen Siblings erkannt werden, basieren auf einer [anderen Version](https://huggingface.co/intfloat/multilingual-e5-large-instruct) von XLM-RoBERTa und wurden auch mit unseren eigenen Daten auf die Aufgabe angepasst.",
          },
          code: {
            title:
              "Ich habe eine spezifische Frage zum Code oder zu den Modellen…",
            text: "Unser Code-Repository findest Du [hier](https://github.com/SamiNenno/Claimspotting) und die maschinelles Lernen Modelle findest Du [hier](https://huggingface.co/Sami92). Wenn Deine Frage nicht beantwortet wird, zöger nicht, ein Issue in unserem Claimspotting-Repository zu erstellen.",
          },
        },
      },
    },
  },
};
