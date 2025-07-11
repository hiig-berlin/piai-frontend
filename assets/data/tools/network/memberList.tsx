import React from "react";

// SYNTAX (array of objects)
// =========================

// Object structure per stakeholder:
//
// {
//   name: String,
//   tags: Array of Strings,
//   link: String (absolute link),
//   location: String (City, Country),
//   description: String
//   fundingFor?: Array of Objects (title: String, url: String)
// }
//
// ADDING FUNDED PROJECTS
// ======================
//
//   …
//   description: "Some description",
//   fundingFor: [
//     {
//       title: "Adams and Sons",
//       url: "/tool/map/project/adams-and-sons"
//     },{
//       title: "Bechtelar, Heathcote and Bogan",
//       url: "/tool/map/project/bechtelar-heathcote-and-bogan"
//     }
//   ]
// }
//
// REGEX Patters to transform csv to json
// ======================================
//
// find
// (.*?),.*?,.*?,.*?,(.*?),(.*?),(.*?),(.*?),(.*?)\n
//
// replace
// {\n  name: "$1",\n  tags: "$2",\n  link: "$3",\n  location: "$4, $5",\n  description: $6\n},\n
//
// Add enter after last entry to replace it!
//
// Replace ""(.*?)"" by “$1”

export const memberList = [
  {
    name: "Alexander von Humboldt Institute for Internet and Society",
    tags: ["Fouding member"],
    link: "https://www.hiig.de/",
    location: "Berlin, Germany",
    people: [
      {
        name: "Dr. Theresa Züger",
        role: "Lead of the AI and Society Lab",
        link: "https://www.hiig.de/en/team/theresa-zueger/",
      },
    ],
  },
  {
    name: "FARI – AI for the Common Good Institute",
    tags: ["Founding member"],
    link: "https://www.fari.brussels/",
    location: "Brussels, Belgium",
    people: [
      {
        name: "Karen Boers",
        link: "https://www.fari.brussels",
      },
      {
        name: "Dr. Carl Mörch",
      },
    ],
  },
  {
    name: "Do you want to join?",
    tags: ["Member"],
    link: "https://publicinterest.ai/tool/network/join",
    location: "Fill out our short application form.",
    people: [
      {
        name: "Your name",
        role: "Your role",
        link: "https://www.your-website.com",
      },
      
    ],
  },
];
