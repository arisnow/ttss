# Trucking The Seven Seas

Modern website for Trucking The Seven Seas, a trucker and content creator focused on transparent truck-driver pay, trucking resources, videos, and consultation booking.

## Live Site

- Vercel: https://ttss-murex.vercel.app
- YouTube: https://www.youtube.com/@truckingthesevenseas

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Lucide React icons

## Local Development

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

## Notes

The booking form currently saves a local draft in the visitor's browser. Connect it to a payment, scheduling, or intake backend before using it for live consultation requests.

The owner-operator tool also stores model versions locally in the visitor's browser. It does not require Supabase or any shared database.
