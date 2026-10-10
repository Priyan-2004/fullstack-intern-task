# TemplateVault — Mini SaaS Template Store

A full-stack template marketplace where users can explore templates, search and filter by category, register and log in, and manage their favorite templates.

## Features

- User registration and login with password hashing and JWT authentication
- Browse template listings and view template details
- Search templates and filter by category
- Add and remove favorite templates
- View saved templates on a dedicated favorites page
- Protected routes for authenticated users
- MongoDB database integration

## Tech Stack

- **Frontend:** React, Vite, React Router, Axios, CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas, Mongoose
- **Authentication:** JSON Web Tokens (JWT), bcryptjs

## Project Structure

```text
fullstack-intern-task/
├── client/
│   ├── public/
│   └── src/
│       ├── api/
│       ├── App.jsx
│       ├── App.css
│       ├── index.css
│       └── main.jsx
├── server/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── seed.js
│   ├── server.js
│   └── package.json
├── .gitignore
└── README.md
```

## Prerequisites

- Node.js and npm
- MongoDB Atlas account or a local MongoDB instance

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/Priyan-2004/fullstack-intern-task.git
cd fullstack-intern-task
```

### 2. Configure and start the backend

```bash
cd server
npm install
```

Create a `.env` file inside the `server/` directory with the following variables:

```env
PORT=5000
CLIENT_URL=http://localhost:5173
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_private_random_secret
```

Replace the example values with your own MongoDB connection string and a strong, private JWT secret. Never commit your `.env` file or expose your credentials.

Start the backend:

```bash
npm run dev
```

Keep the backend terminal running.

### 3. Seed the database

Open a separate terminal from the project root and run:

```bash
cd server
node seed.js
```

This seeds the sample template data. Check the seed script before running it again to understand whether it clears existing records.

### 4. Configure and start the frontend

Open another terminal from the project root and run:

```bash
cd client
npm install
npm run dev
```

Open the application in your browser:

http://localhost:5173

Keep the frontend terminal running.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Log in and receive an authentication token |
| GET | `/api/templates` | List templates with search and category filtering |
| GET | `/api/templates/:id` | Get template details |
| GET | `/api/favorites` | Get the authenticated user's favorite templates |
| POST | `/api/favorites/:templateId` | Add a template to favorites |
| DELETE | `/api/favorites/:templateId` | Remove a template from favorites |

## Author

**Name:** Priyan G S  
**Email:** gspriyan1411@gmail.com  
**GitHub:** https://github.com/Priyan-2004

## Repository

https://github.com/Priyan-2004/fullstack-intern-task