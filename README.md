# multycomm-form

A beginner-friendly full stack enquiry form built with React, Axios, Node.js, Express.js, MongoDB, and Nodemailer.

## Folder Structure

```text
multycomm-form
├── backend
│   ├── src
│   │   ├── models
│   │   │   └── FormSubmission.js
│   │   ├── routes
│   │   │   └── formRoutes.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
├── frontend
│   ├── src
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Backend Setup

```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

Update `backend/.env` with your MongoDB URL and SMTP email settings.

Default backend URL:

```text
http://localhost:5000
```

POST API:

```text
POST http://localhost:5000/api/form
```

## Frontend Setup

Open a second terminal:

```bash
cd frontend
npm install
copy .env.example .env
npm run dev
```

Default frontend URL:

```text
http://localhost:5173
```

## Email Routing

Emails are sent only when the selected disposition is not `General Enquiry`.

```text
Customer Support    -> ayan@multycomm.com
Consultant Support  -> akash@multycomm.com
B2B Lead            -> deepak@multycomm.com
New Lead            -> aveek@multycomm.com
General Enquiry     -> no email, only saved in MongoDB
```

Email subject:

```text
New Client Enquiry from MultyComm Form
```

## Notes

- Make sure MongoDB is running before starting the backend.
- If you use Gmail SMTP, create an app password and use it as `SMTP_PASS`.
- The backend saves every valid form submission in MongoDB.


# git 
- you can clone from my git hub
