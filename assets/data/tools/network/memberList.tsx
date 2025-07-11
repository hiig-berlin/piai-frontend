import React from "react";

// SYNTAX (array of objects)
// =========================

// Object structure per member:
//
// { name: "Name of the member",
//   tags: ["Tag1", "Tag2"],
//   link: "https://www.link-to-member.com",
//   location: "City, Country",
//   people: [
//     { name: "Person Name",
//       role: "Role of the person", // optional
//       link: "https://www.link-to-person.com" // optional
//     }
//   ]

export const memberList = [
  {
    name: "Alexander von Humboldt Institute for Internet and Society",
    tags: ["Founding member"],
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
        role: "XX",
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

