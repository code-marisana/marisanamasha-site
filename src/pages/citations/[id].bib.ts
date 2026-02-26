import { getCollection } from "astro:content";
import { toBibTeX } from "../../utils/bibtex";

export async function getStaticPaths() {
  const publications = await getCollection("publications");
  return publications.map((publication) => ({ params: { id: publication.id } }));
}

export async function GET({ params }) {
  const publications = await getCollection("publications");
  const publication = publications.find((item) => item.id === params.id);

  if (!publication) {
    return new Response("Not Found", { status: 404 });
  }

  return new Response(toBibTeX(publication.data), {
    headers: {
      "Content-Type": "application/x-bibtex; charset=utf-8",
      "Content-Disposition": `attachment; filename=\"${publication.id}.bib\"`
    }
  });
}
