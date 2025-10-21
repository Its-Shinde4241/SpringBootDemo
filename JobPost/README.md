# JobPost Frontend (React + Vite)

React 19 + Vite UI for the Job Post application. Uses MUI for UI, Axios for API calls, and React Router for navigation.

Backend base URL: `http://localhost:8080` (see root README for backend setup).

## Prerequisites

- Node.js 18+
- Backend running on `http://localhost:8080` with CORS allowing `http://localhost:5173` (default in this repo)

## Install and run

```
npm install
npm run dev
```

Vite serves at `http://localhost:5173`.

## Build and preview

```
npm run build
npm run preview
```

## Authentication

All API calls use HTTP Basic auth. This project currently uses demo credentials hardcoded in components:

- username: `shubham`
- password: `shinde`

Update these in `src/components/*.jsx` if you use a different user.

## Primary screens

- `/` — List all posts (`AllPosts`)
- `/create` — Create a post
- `/edit` — Edit a post (navigated with state: `{ id }`)
- `/search` — Search posts by keyword

## API endpoints used

- GET `http://localhost:8080/jobPosts`
- GET `http://localhost:8080/jobPost/{id}`
- GET `http://localhost:8080/jobPosts/keyword/{keyword}`
- POST `http://localhost:8080/jobPost`
- DELETE `http://localhost:8080/jobPost/{id}`

All requests include HTTP Basic auth via Axios.

## Notes

- If you see CORS errors, ensure the backend allows origin `http://localhost:5173` (see `SecurityConfig.corsConfigurationSource`).
- To change the API base URL, consider centralizing it in an Axios instance and reading from an env var like `VITE_API_BASE_URL`.
