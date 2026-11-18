# Movies Web

Next.js front end for the Movies API.

## Setup

1. Start the API first (port 3000).
2. Create `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

3. Run:

```
npm install
npm run dev
```

Open http://localhost:3001

## Structure

- `app/` pages (movies, login, register, playlists, admin)
- `components/` Navbar, MovieCard
- `lib/api.js` talks to the API, `lib/session.js` handles the token cookie
- `proxy.js` redirects logged-out users from /playlists and /admin

## Auth

The JWT is stored in an HttpOnly cookie, set by a Server Action. The admin
area is checked in `app/admin/layout.js`, and the API enforces roles.