import { getCollection } from "astro:content";
import { toRIS } from "../../utils/ris";

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

  return new Response(toRIS(publication.data), {
    headers: {
      "Content-Type": "application/x-research-info-systems; charset=utf-8",
      "Content-Disposition": `attachment; filename=\"${publication.id}.ris\"`
    }
  });
}
