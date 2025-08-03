🧠 Job Tracker Backend
A RESTful backend API built with Node.js, Express, and MongoDB for managing job applications. It supports JWT-based authentication, user roles (seeker, employer), and CRUD operations for job postings and user profiles.

🔧 Features
User registration & login (JWT)

Role-based access control (Seeker & Employer)

Job posting creation & management (Employer)

Job browsing (Seeker)

Profile management

Express middleware for authentication & validation

MongoDB integration with Mongoose

🛠️ Tech Stack
Node.js

Express.js

MongoDB & Mongoose

JWT for authentication

bcryptjs for password hashing

dotenv for environment management

CORS, helmet, etc. for security

📦 Installation
bash
Copy
Edit
# Clone the repo
git clone https://github.com/your-username/job-tracker-backend.git
cd job-tracker-backend

# Install dependencies
npm install

# Create a .env file (see below)
touch .env
