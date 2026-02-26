export async function GET() {
  return new Response(
    `User-agent: *\nAllow: /\n\nSitemap: https://marisanamasha.com/sitemap-index.xml\n`,
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8"
      }
    }
  );
}
