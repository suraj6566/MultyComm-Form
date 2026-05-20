# MultyComm Form

Simple full stack form project made using React, Node.js, Express.js, MongoDB, Axios, and Nodemailer.

The form saves user data in MongoDB.

Email functionality is currently disabled/commented so the project can run without SMTP setup.

---

# Features

- User enquiry form
- MongoDB database integration
- REST API using Express.js
- Save form data in database
- React frontend form
- Axios API integration
- Conditional email logic
- Simple and beginner friendly code

---

# Frontend

Frontend is made using:
- React
- Axios
- Vite

Used for:
- Form UI
- User input
- API calls

---

# Backend

Backend is made using:
- Node.js
- Express.js
- MongoDB
- Mongoose
- Nodemailer

Used for:
- API creation
- Database connection
- Saving form data

---

# Backend Setup

```bash
cd backend
npm install
npm run dev

Create `.env` file inside backend folder:

```env
PORT=5000

MONGO_URI=mongodb://127.0.0.1:27017/multycomm-form
```