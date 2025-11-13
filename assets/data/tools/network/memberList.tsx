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
        link: "https://www.hiig.de/en/theresa-zueger/",
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
        role: "Managing Director of FARI - AI for the Common Good Institute",
        link: "https://www.fari.brussels/community",
      },
      {
        name: "Dr. Carl Mörch",
        role: "Co-Director of FARI - AI for the Common Good Institute",
        link: "https://www.fari.brussels/community"
      },
    ],
  },
  {
    name: "MI4People gGmbH",
    tags: ["Member"],
    link: "https://www.mi4people.org/",
    location: "Munich, Germany",
    people: [
      {
        name: "Dr. Paul Springer",
        role: "Co-Founder and Managing Director at MI4People",
        link: "https://www.mi4people.org/paul-springer",
      },
    ],
  },
  {
    name: "University of São Paulo",
    tags: ["Member"],
    link: "https://ciaam.usp.br/en/",
    location: "São Paulo, Brazil",
    people: [
      {
        name: "André Carlos Ponce de Leon F. de Carvalho",
        role: "Full Professor and Director of the Institute of Mathematics and Computer Science (ICMC-USP)",
        link: "https://ciaam.usp.br/en/our-team/",
      },
    ],
  },
  {
    name: "Mila - Institut québécois d'intelligence artificielle",
    tags: ["Member"],
    link: "https://mila.quebec/en",
    location: "Montréal, Canada",
    people: [
      {
        name: "Benjamin Prud'homme",
        role: "Benjamin Prud'homme is Vice-President of Policy, Safety and Global Affairs",
        link: "https://mila.quebec/en/directory/benjamin-prudhomme",
      },
    ],
  },
  {
    name: "Transformations Community",
    tags: ["Member"],
    link: "https://transformationscommunity.org/",
    location: "Boulder, USA",
    people: [
      {
        name: "Bruce Goldstein",
        role: "Research Professor at the Institute of Behavioral Science at the University of Colorado Boulder",
        link: "https://transformationscommunity.org/team/",
      },
    ],
  },
  {
    name: "Pontificia Universidad Catolica de Chile",
    tags: ["Member"],
    link: "https://www.uc.cl/",
    location: "Santiago, Chile",
    people: [
      {
        name: "Gabriela Arriagada-Bruneau",
        role: "Assistant Professor at the Institute of Applied Ethics and the Institute of Computational and Mathematical Engineering",
        link: "https://eticasaplicadas.uc.cl/profesores/gabriela-arriagada-bruneau/",
      },
    ],
  },
  {
    name: "National Centre for Artificial Intelligence (CENIA)",
    tags: ["Member"],
    link: "https://cenia.cl/",
    location: "Macul, Chile",
    people: [
      {
        name: "Gabriela Arriagada-Bruneau",
        role: "Young Researcher",
        link: "https://cenia.cl/en/profiles/?ref=gabriela-arriagada-bruneau",
      },
    ],
  },
  {
    name: "RIKEN AIP",
    tags: ["Member"],
    link: "https://aip.riken.jp/",
    location: "Tokyo, Japan",
    people: [
      {
        name: "Toshiyasu Ichioka",
        role: "Director RIKEN Europe Office",
        link: "https://www.riken.jp/en/europe/",
      },
    ],
  },
];

