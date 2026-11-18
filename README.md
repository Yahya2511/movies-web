# Movies Web

Next.js (App Router) front end for the Movies API.
Stack: Next.js, React, Tailwind CSS. Plain JavaScript.

API repo: [PUT API REPO LINK HERE]

## Requirements

- Node.js 20 or newer
- The Movies API running (see its README)

## Setup

1. Start the API first (http://localhost:3000).
2. Copy `.env.example` to `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

3. Install and run:

```
npm install
npm run dev
```

Open http://localhost:3001

The dev server uses port 3001 on purpose: the API allows that origin through
CORS (`CLIENT_URL`). If you change the port, change `CLIENT_URL` in the API.

## Test accounts (only if the API database was seeded)

| Role  | Email          | Password |
|-------|----------------|----------|
| admin | admin@mail.com | admin123 |
| user  | bob@mail.com   | 123456   |

You can also create an account at /register.

## Pages

| URL | Access | What it does |
|-----|--------|--------------|
| / | Public | Home |
| /movies | Public | Movie list with search, director filter, sort, pagination |
| /movies/:id | Public | Details, average rating, ratings list |
| /login, /register | Public | Sign in and sign up |
| /movies/:id (logged in) | Login | Rate, edit or delete your rating, add to a playlist |
| /playlists | Login | List, create and delete your playlists |
| /playlists/:id | Login | Rename, see movies, remove a movie |
| /admin | Admin | Manage movies (list, delete) |
| /admin/movies/new | Admin | Add a movie |
| /admin/movies/:id | Admin | Edit a movie |
| /admin/users | Admin | List and delete users |

## How authentication works

- Login and register are Server Actions. They call the API and save the JWT in
  an HttpOnly cookie named `token` (JavaScript in the browser cannot read it).
- Server Components read the cookie and send it to the API as
  `Authorization: Bearer <token>` (`authApi` in `lib/api.js`).
- `proxy.js` redirects logged-out users away from /playlists and /admin.
- `app/admin/layout.js` blocks users who are not admins.
- These checks are for user experience only. The API is the real protection
  and enforces roles on every request.

## Project structure

```
app/            pages (each folder is a URL, page.js is the screen)
  admin/        admin pages, layout.js checks the role
  login/ register/ playlists/ movies/
  error.js      error page
components/     Navbar, MovieCard
lib/
  api.js        api() and authApi() helpers
  session.js    token cookie helpers
  auth.js       getCurrentUser()
proxy.js        route protection
```

## Scripts

- `npm run dev`: development server on port 3001
- `npm run build`: production build
- `npm start`: run the production build

## Known limits

- No automated tests.
- Admin movie list shows up to 50 movies (no pagination there).
- If the API is stopped, pages show the error page with a "Try again" button.