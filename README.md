# Smart Leads Dashboard

A full-stack Lead Management Dashboard built using the MERN stack with clean architecture, scalable code practices, and a professional user experience.

## Features
- **JWT-based Authentication**: Secure user registration and login with protected routes and role-based access control (Admin vs Sales User).
- **Leads Management**: Full CRUD operations for leads including Name, Email, Status (New, Contacted, Qualified, Lost), and Source.
- **Advanced Filtering & Search**: Multiple filters working together (Status, Source), search by Name/Email with debouncing, and sorting (Latest/Oldest).
- **Pagination**: Backend pagination implemented using skip/limit, displaying 10 records per page.
- **Responsive UI**: Clean and dynamic design using React, TailwindCSS, featuring dark mode and micro-interactions.
- **CSV Export**: Export leads to a CSV file.
- **API Standards**: RESTful API structure with proper HTTP status codes, request validation using Zod, and centralized error handling.

## Technologies Used
- **Frontend**: React.js, TypeScript, TailwindCSS, React Router DOM, React Query, Axios.
- **Backend**: Node.js, Express.js, TypeScript, MongoDB, Mongoose, Zod, jsonwebtoken, bcrypt, json2csv.

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MongoDB running locally or a MongoDB URI

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd "Full stack Internship assignment"
```

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your specific configuration if necessary
npm run build
npm start
# Or for development: npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run build
npm run preview
# Or for development: npm run dev
```

## Docker Setup
Alternatively, you can run the entire stack using Docker Compose:
```bash
docker-compose up --build
```
This will start the backend server on port 5000, frontend on port 80, and a MongoDB instance on port 27017.

## Admin User Setup
You can change a user's role to 'Admin' directly in MongoDB to test the admin functionality (e.g., deleting leads).

## Environment Variables
See `.env.example` in both `frontend` and `backend` directories.
