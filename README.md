# Basic React + Node + MongoDB App

This is a minimal example app to practice Dockerizing and CI pipelines.

- Server: Express + Mongoose (API at `/api/items`)
- Client: React (shows items in a table, add and delete)
- DB: MongoDB (via docker-compose)

Quick run (requires Docker):

```bash
# build and start services
docker-compose up --build

# server: http://localhost:5000
# client: http://localhost:3000
```

GitHub Actions workflow is included at `.github/workflows/ci.yml`.
