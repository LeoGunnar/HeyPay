# Hey Iceland Bookings Dashboard

A Next.js application for Hey Iceland teams to review bookings and manage access levels. The dashboard uses Supabase for authentication (with Microsoft SSO) and data storage.

## Getting started

1. Duplicate `.env.local.example` to `.env.local` and fill in the Supabase credentials for your existing project.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Visit [http://localhost:3000](http://localhost:3000) and sign in with your Microsoft account.

## Environment variables

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key |

## Supabase setup

The app expects the following tables in the `public` schema:

- `bookings` — stores booking metadata with columns `id`, `guest_name`, `property_name`, `check_in_date`, `check_out_date`, `status`, `created_at`.
- `profiles` — stores profile information with columns `id`, `full_name`, `email`, `role`, `updated_at`.

Populate `user_metadata.role` in Supabase Auth to distinguish between the two tiers:

- `admin` — full access, can open the Admin page.
- `agent` — limited to the booking overview.

## Authentication

Supabase handles authentication using the Microsoft (Azure) provider. The login page uses a Microsoft sign-in button that redirects to `/auth/callback` to establish the Supabase session.

## Styling

The interface follows Hey Iceland’s colour palette: teal, turquoise, warm neutrals, and orange accents. Tailwind CSS powers the design system, with custom colours configured in `tailwind.config.ts`.

## Available scripts

- `npm run dev` – run Next.js in development mode.
- `npm run build` – create an optimized production build.
- `npm run start` – run the production build.
- `npm run lint` – check the codebase with ESLint.

## Deploying with Cloudflare Wrangler

The project includes a `wrangler.jsonc` file so you can upload the compiled Next.js assets without passing additional flags. Wrangler now executes `npm run build` automatically before packaging, which ensures the `.next/static` directory exists even in clean build environments. To deploy:

1. Run the upload command:
   ```bash
   npx wrangler versions upload
   ```

Wrangler will build the Next.js project first and then upload the generated static assets. If you prefer to run the build yourself (for example, to inspect the bundle locally), execute `npm run build` manually and then rerun the upload. You can also override the directory explicitly with the `--assets` flag when uploading:

```bash
npx wrangler versions upload --assets=.next/static
```

This resolves the `Missing entry-point to Worker script or to assets directory` error by pointing Wrangler to the generated static files.

