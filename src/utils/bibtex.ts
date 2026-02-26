import type { Publication } from "./citation";

export const toBibTeX = (pub: Publication): string => {
  // BibTeX expects "Family, Given" and authors joined with "and".
  const authors = pub.authors.map((a) => `${a.family}, ${a.given}`).join(" and ");
  const type = pub.type.includes("law") ? "article" : "article";

  return `@${type}{${pub.id},
  title = {${pub.title}},
  author = {${authors}},
  journal = {${pub.journal}},
  year = {${pub.year}},
  volume = {${pub.volume ?? ""}},
  number = {${pub.issue ?? ""}},
  pages = {${pub.pages ?? ""}},
  doi = {${pub.doi ?? ""}},
  keywords = {${pub.keywords.join(", ")}},
  note = {Fields: ${pub.fields.join(", ")}; Type: ${pub.type}}
}`;
};
