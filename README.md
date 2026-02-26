# Marisana Masha Academic Portfolio (Astro)

Production-ready Astro website for a researcher in Chemical Engineering, Energy Systems, Hydrogen Production, and Law.

## Stack
- Astro 5
- Tailwind CSS
- Astro Content Collections (`blog`, `projects`, `publications`)
- RSS feed (`/rss.xml`)
- Robots (`/robots.txt`)
- Sitemap (`/sitemap-index.xml`)

## Folder Structure

```text
src/
  components/
    Card.astro
    CopyButton.astro
    Footer.astro
    Navbar.astro
    PublicationJsonLd.astro
    SEO.astro
  content/
    blog/
      hydrogen-policy-models.md
      process-intensification-pyrolysis.md
    projects/
      energy-law-observatory.md
      hydrogen-cluster-roadmap.md
      pyrolysis-digital-twin.md
    publications/
      masha2025hydrogen.json
      masha2026energyregulation.json
    config.ts
  layouts/
    BaseLayout.astro
  pages/
    blog/
      [slug].astro
      index.astro
    citations/
      [id].bib.ts
      [id].ris.ts
    projects/
      [slug].astro
    publications/
      [id].astro
    contact.astro
    index.astro
    projects.astro
    publications.astro
    research.astro
    robots.txt.ts
    rss.xml.ts
  styles/
    global.css
  utils/
    bibtex.ts
    citation.ts
    ris.ts
astro.config.mjs
tailwind.config.mjs
postcss.config.cjs
netlify.toml
vercel.json
```

## Citation Generator Examples

Scientific publication (`masha2025hydrogen`):
- APA: `Masha, M. & Author, C. (2025). Hydrogen Production via Intensified Pyrolysis. Journal of Cleaner Energy, 18(2), 145-162. https://doi.org/10.1016/j.jclepro.2025.123456`
- ACS: `Masha, M.; Author, C. Hydrogen Production via Intensified Pyrolysis. Journal of Cleaner Energy 2025, 18 (2), 145-162. DOI: 10.1016/j.jclepro.2025.123456.`

Legal publication (`masha2026energyregulation`):
- OSCOLA: `Marisana Masha, 'Regulating Hydrogen Infrastructure in Emerging Economies' (2026) 12(1) Energy Law Review 33-57`
- Bluebook: `Marisana Masha, Regulating Hydrogen Infrastructure in Emerging Economies, 12 Energy Law Review 33-57 (2026).`

## Setup

1. Install dependencies:

```bash
npm install
```

2. Run development server:

```bash
npm run dev
```

3. Build production assets:

```bash
npm run build
```

4. Preview build:

```bash
npm run preview
```

## Deployment

### Vercel
1. Push repository to GitHub.
2. Import project in Vercel.
3. Framework preset: `Astro`.
4. Build command: `npm run build`.
5. Output directory: `dist`.

### Netlify
1. Push repository to GitHub.
2. Import project in Netlify.
3. Build command: `npm run build`.
4. Publish directory: `dist`.
5. `netlify.toml` is included.

## Notes
- Publication detail pages include copy buttons for APA, ACS, Harvard, OSCOLA, Chicago (notes), and Bluebook styles.
- BibTeX and RIS download endpoints are available at:
  - `/citations/:id.bib`
  - `/citations/:id.ris`
