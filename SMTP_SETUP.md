# SMTP2GO Contact Form Setup

The rebuilt site uses a Next.js route handler at `app/api/contact/route.ts`.
The contact form posts to `/api/contact`, validates the payload, and sends email
through SMTP2GO.

## Environment Variables

Create `.env.local` for local development and add the same values in your hosting
provider dashboard:

```bash
SMTP2GO_API_KEY=your-smtp2go-api-key
SMTP2GO_FROM_EMAIL=noreply@kpweld.sk
BUSINESS_EMAIL=kpweldsro@gmail.com
```

Never commit real API keys to the repository.

## Local Development

```bash
npm install
npm run dev
```

Open `http://127.0.0.1:3000/kontakt` and submit the form after the environment
variables are configured.

## Netlify Deployment

`netlify.toml` is configured for Next.js:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

Add the SMTP2GO variables in Netlify under Site configuration, then deploy.

## Troubleshooting

- Check that `SMTP2GO_API_KEY` is present in the deployment environment.
- Confirm `SMTP2GO_FROM_EMAIL` is an approved sender in SMTP2GO.
- Check SMTP2GO activity logs if the form succeeds but email does not arrive.
- The form falls back to the KP-WELD phone number when email sending fails.
