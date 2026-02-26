import type { Publication } from "./citation";

const risType = (type: Publication["type"]) => {
  if (type === "law-review-article" || type === "case-comment") return "JOUR";
  return "JOUR";
};

export const toRIS = (pub: Publication): string => {
  // RIS uses one tag per line and terminates with ER.
  const lines = [
    `TY  - ${risType(pub.type)}`,
    ...pub.authors.map((author) => `AU  - ${author.family}, ${author.given}`),
    `TI  - ${pub.title}`,
    `JO  - ${pub.journal}`,
    `PY  - ${pub.year}`,
    pub.volume ? `VL  - ${pub.volume}` : "",
    pub.issue ? `IS  - ${pub.issue}` : "",
    pub.pages ? `SP  - ${pub.pages.split("-")[0]}` : "",
    pub.pages?.includes("-") ? `EP  - ${pub.pages.split("-")[1]}` : "",
    pub.doi ? `DO  - ${pub.doi}` : "",
    `KW  - ${pub.keywords.join("; ")}`,
    `N1  - Fields: ${pub.fields.join(", ")}; Type: ${pub.type}`,
    "ER  -"
  ].filter(Boolean);

  return lines.join("\n");
};
