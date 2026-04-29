# KP-WELD Project Notes

KP-WELD is now a Next.js, Tailwind CSS, and TypeScript site.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS through `@tailwindcss/postcss`
- Lucide React icons
- Next route handler for contact form email

## Key Folders

- `app/` - pages, metadata, route handlers, sitemap, robots
- `components/` - shared UI components
- `lib/` - typed site content and gallery helpers
- `public/sources/` - project images from the original site

## Routes

- `/`
- `/o-nas`
- `/produkty-sluzby`
- `/produkty-sluzby/[slug]`
- `/referencie`
- `/kontakt`
- `/api/contact`

Legacy `.html` URLs are redirected in `next.config.ts`.

## Commands

```bash
npm run dev
npm run typecheck
npm run build
```
