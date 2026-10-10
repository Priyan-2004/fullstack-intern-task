# TemplateVault — Mini SaaS Template Store

A full-stack template marketplace where users can explore templates, search and filter by category, register and log in, and manage their favorite templates.

## Features

- User registration and login with password hashing and JWT authentication
- Browse template listings and view template details
- Search templates and filter by category
- Add and remove favorite templates
- View saved templates on a dedicated favorites page
- Protected authentication routes
- MongoDB database integration

## Tech Stack

**Frontend:** React, Vite, React Router, Axios, CSS  
**Backend:** Node.js, Express.js  
**Database:** MongoDB Atlas, Mongoose  
**Authentication:** JSON Web Tokens (JWT), bcryptjs

## Project Structure

```text
fullstack-intern-task/
├── client/
│   └── src/
├── server/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── seed.js
│   └── server.js
└── README.md
```

## Prerequisites

- Node.js and npm
- A MongoDB database (local MongoDB or MongoDB Atlas)

## Setup Instructions

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd fullstack-intern-task
```

### 2. Configure the backend

```bash
cd server
npm install
```

Create a `.env` file inside `server/`:

```env
PORT=5000
CLIENT_URL=http://localhost:5173
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_private_random_secret
```

Replace the example values with your own configuration. Never commit your `.env` file.

Start the backend:

```bash
npm run dev
```

### 3. Seed the database

In a separate terminal:

```bash
cd server
node seed.js
```

Run this only when you intend to seed or reset the template data, according to the seed script's behavior.

### 4. Configure the frontend

In a separate terminal:

```bash
cd client
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/auth/register` | Register a user |
| POST | `/api/auth/login` | Log in |
| GET | `/api/templates` | List and filter templates |
| GET | `/api/templates/:id` | Get template details |
| GET | `/api/favorites` | Get the authenticated user's favorites |
| POST | `/api/favorites/:templateId` | Add a favorite |
| DELETE | `/api/favorites/:templateId` | Remove a favorite |

## Author

**Name:** Priyan G S
**Email:** gspriyan1411@gmail.com
**GitHub:** https://github.com/Priyan-2004
