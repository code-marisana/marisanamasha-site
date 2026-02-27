import type { CollectionEntry } from "astro:content";

export type Publication = CollectionEntry<"publications">["data"];

// Normalizes author rendering across citation styles.
const joinAuthors = (authors: Publication["authors"], format: "full" | "initials" = "full") => {
  return authors
    .map((author) => {
      if (format === "initials") {
        return `${author.family}, ${author.given
          .split(" ")
          .map((part) => `${part[0]}.`)
          .join(" ")}`;
      }
      return `${author.given} ${author.family}`;
    })
    .join(authors.length > 2 ? "; " : " & ");
};

const stylePages = (pages?: string) => (pages ? `, ${pages}` : "");
const styleIssue = (issue?: string) => (issue ? `(${issue})` : "");
const styleVolume = (volume?: string) => (volume ? volume : "");
const doiSuffix = (doi?: string) => (doi ? ` https://doi.org/${doi}` : "");

export const formatCitation = (pub: Publication, style: CitationStyle): string => {
  const authorsInitials = joinAuthors(pub.authors, "initials");
  const authorsFull = joinAuthors(pub.authors, "full");
  const year = pub.year;
  const issue = styleIssue(pub.issue);
  const volume = styleVolume(pub.volume);
  const isThesis = pub.type === "masters-thesis" || pub.type === "phd-thesis";
  const thesisLabel = pub.type === "phd-thesis" ? "PhD thesis" : "Master's thesis";

  if (isThesis) {
    switch (style) {
      case "apa":
        return `${authorsInitials} (${year}). ${pub.title} [${thesisLabel}]. ${pub.journal}.${pub.url ? ` ${pub.url}` : ""}`.trim();
      case "acs":
        return `${authorsInitials}. ${pub.title}; ${pub.journal}, ${year}; ${thesisLabel}.${pub.url ? ` ${pub.url}.` : ""}`.trim();
      case "harvard":
        return `${authorsInitials} ${year}, ${pub.title}, ${thesisLabel}, ${pub.journal}.${pub.url ? ` Available at: ${pub.url}.` : ""}`.trim();
      case "oscola":
        return `${authorsFull}, ${pub.title} (${thesisLabel}, ${pub.journal} ${year})${pub.url ? ` <${pub.url}>` : ""}`.trim();
      case "chicago":
        return `${authorsFull}, ${pub.title} (${pub.journal}, ${year}), ${thesisLabel}.${pub.url ? ` ${pub.url}.` : ""}`.trim();
      case "bluebook":
        return `${authorsFull}, ${pub.title} (${thesisLabel}, ${pub.journal} ${year})${pub.url ? `, ${pub.url}` : ""}.`.replace(/\s+/g, " ");
      default:
        return "";
    }
  }

  switch (style) {
    case "apa":
      return `${authorsInitials} (${year}). ${pub.title}. ${pub.journal}, ${volume}${issue}${stylePages(
        pub.pages
      )}.${doiSuffix(pub.doi)}`.replace(/\s+/g, " ").trim();
    case "acs":
      return `${authorsInitials}. ${pub.title}. ${pub.journal} ${year}, ${volume}${issue ? ` (${pub.issue})` : ""}${
        pub.pages ? `, ${pub.pages}` : ""
      }.${pub.doi ? ` DOI: ${pub.doi}.` : ""}`;
    case "harvard":
      return `${authorsInitials} ${year}, '${pub.title}', ${pub.journal}, vol. ${volume}${
        pub.issue ? `, no. ${pub.issue}` : ""
      }${pub.pages ? `, pp. ${pub.pages}` : ""}.${pub.doi ? ` doi:${pub.doi}.` : ""}`;
    case "oscola":
      return `${authorsFull}, '${pub.title}' (${year}) ${volume}${pub.issue ? `(${pub.issue})` : ""} ${
        pub.journal
      }${pub.pages ? ` ${pub.pages}` : ""}${pub.doi ? ` <https://doi.org/${pub.doi}>` : ""}`;
    case "chicago":
      return `${authorsFull}, "${pub.title}," ${pub.journal} ${volume}${
        pub.issue ? `, no. ${pub.issue}` : ""
      } (${year})${pub.pages ? `: ${pub.pages}` : ""}.${pub.doi ? ` https://doi.org/${pub.doi}.` : ""}`;
    case "bluebook":
      return `${authorsFull}, ${pub.title}, ${volume} ${pub.journal} ${pub.pages ?? ""} (${year})${
        pub.doi ? `, https://doi.org/${pub.doi}` : ""
      }.`.replace(/\s+/g, " ");
    default:
      return "";
  }
};

export type CitationStyle = "apa" | "acs" | "harvard" | "oscola" | "chicago" | "bluebook";

export const allCitations = (pub: Publication): Record<CitationStyle, string> => ({
  apa: formatCitation(pub, "apa"),
  acs: formatCitation(pub, "acs"),
  harvard: formatCitation(pub, "harvard"),
  oscola: formatCitation(pub, "oscola"),
  chicago: formatCitation(pub, "chicago"),
  bluebook: formatCitation(pub, "bluebook")
});
