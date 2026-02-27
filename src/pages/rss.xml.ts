import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const posts = (await getCollection("blog", ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  ).filter((post) => !["hydrogen-policy-models", "process-intensification-pyrolysis"].includes(post.slug));

  return rss({
    title: "Marisana Masha Research Blog",
    description: "Notes on hydrogen, energy systems, chemical engineering, and law.",
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/blog/${post.slug}/`
    }))
  });
}
