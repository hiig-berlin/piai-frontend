import { link } from "fs";
import { title } from "process";
import { text } from "stream/consumers";

export const textBits = {
  en: {
    index: {
      about: {
        title: "About the Network",
        text: "The PIAI network is an international hub is an initiative to bring together research institutions and practitioners from this field to exchange on AI in the public interest and for the common good. It is initiated by the AI & Society Lab at the [Alexander von Humboldt Institute for Internet and Society](https://hiig.de) and [FARI – AI for the Common Good Institute](https://www.fari.brussels/).",
        button: {
          label: "Find out more",
          link: "/tool/network/about",
        },
      },
      join: {
        title: "Join the Network",
        text: "We're a growing network and welcome new members. If you are interested in joining the network, please fill out our brief application form.",
        button: {
          label: "Join now",
          link: "/tool/network/join",
        },
      },
      endorsement: {
        title: "Endorsements",
      },
      goals: [
        "Strengthen cross-disciplinary collaborations on an much-needed topic for AI",
        "Exchange best practices, tools, and methodologies of actors active",
        "Identify and coordinate joint funding and project opportunities",
        "Shape a shared agenda that balances innovation with public interest",
      ],
    },
    about: {
      intro: "The PIAI network is an international hub to promote research and exchange on AI in the public interest and for the common good. It is initiated by the AI & Society Lab at the  Alexander von Humboldt Institute for Internet and Society  and FARI – AI for the Common Good Institute.",
      CTA: {
        title: "Join the Network",
        text: "If you are interested in joining the network, please fill out our brief application form.",
        button: {
          label: "Join now",
          link: "/tool/network/join",
        },
      },
      info: {
        purpose: {
          title: "What is the purpose of the network?",
          text: "AI development and implementation is on the rise in many sectors of society. However, this development is most often driven by commercial interest and industrial development. The network's purpose is to put an emphasis on the urgent need to bring the public interest and the common good to the core of considerations to develop and implement AI. This requires a purpose driven approach to use cases, prioritizing maximization of positive impacts for people and the planet over financial gain. It also requires a high standard for ethical development and governance of such applications and infrastructures in the public interest. The network aims to foster this public interest focus for AI by strengthening exchange in research and development, inspiring collaboration and finding a voice in the overall AI discourse.",
        },
        activities: {
          title: "What does the network do?",
          text: "The network is meeting regularly for exchange and coordination in online meetings and at relevant conferences and other events. The meetings give room to invite experts to present new findings, projects and methods in the field of public interest AI and engage in exchange in the format of working groups on relevant research and practical questions. In the course of its work the network aims to identify common problems or positions and develop ideas for collaborative action.",
        },
        membership: {
          title: "Who can become a part of the network?",
          text: "Members of the network are researchers and practitioners from different disciplinary backgrounds who belong to institutions with a proclaimed focus on public interest AI or AI for the common good. Their work is directed towards applied outcomes (in applications of AI) or research on real-life applications of AI for the public interest. In general, anyone interested in becoming part of the network can apply to join the network group. To be invited to join the applicant should be able to show their relation to the field of public interest AI research and/or application and an institutional setting supporting this work.",
        },
      },
    },
  },
};
