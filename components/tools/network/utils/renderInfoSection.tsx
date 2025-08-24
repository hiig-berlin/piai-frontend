import showdown from "showdown";


type InfoSection = {
  title: string;
  text: string;
  [key: string]: any; // for nested subsections
};

type StringsAbout = {
  intro: {
    title: string;
    text: string;
  };
  CTA: {
    title: string;
    text: string;
    button: {
      label: string;
      link: string;
    };
  };
  info: {
    purpose: InfoSection;
    activities: InfoSection;
    membership: InfoSection;
  };
};

const converter = new showdown.Converter();

function isInfoSection(value: any): value is InfoSection {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof value.title === "string" &&
    typeof value.text === "string"
  );
}

export function renderInfoSection(info: StringsAbout["info"]): string {
  return Object.entries(info)
    .flatMap(([_, section]) => {
      const parts: string[] = [];

      // Main section title + text
      parts.push(`<h2>${section.title}</h2>`);
      parts.push(`<p>${converter.makeHtml(section.text)}</p>`);

      // Subsections, skipping 'title' and 'text'
      Object.entries(section).forEach(([key, value]) => {
        if (key !== "title" && key !== "text" && isInfoSection(value)) {
          parts.push(`<h3>${value.title}</h3>`);
          parts.push(`<p>${converter.makeHtml(value.text)}</p>`);
        }
      });

      return parts;
    })
    .join("\n");
}
