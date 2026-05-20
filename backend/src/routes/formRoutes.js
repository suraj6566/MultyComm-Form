const express = require("express");
const nodemailer = require("nodemailer");
const FormSubmission = require("../models/FormSubmission");

const router = express.Router();

const dispositionEmails = {
  "Customer Support": "ayan@multycomm.com",
  "Consultant Support": "akash@multycomm.com",
  "B2B Lead": "deepak@multycomm.com",
  "New Lead": "aveek@multycomm.com"
};

const allowedDispositions = [
  ...Object.keys(dispositionEmails),
  "General Enquiry"
];

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function buildEmailHtml(submission) {
  return `
    <h2>New Client Enquiry from MultyComm Form</h2>
    <p><strong>Name:</strong> ${escapeHtml(submission.name)}</p>
    <p><strong>Company:</strong> ${escapeHtml(submission.company)}</p>
    <p><strong>Gender:</strong> ${escapeHtml(submission.gender)}</p>
    <p><strong>Age:</strong> ${escapeHtml(submission.age)}</p>
    <p><strong>Email:</strong> ${escapeHtml(submission.email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(submission.phone)}</p>
    <p><strong>Disposition:</strong> ${escapeHtml(submission.disposition)}</p>
    <p><strong>Query:</strong></p>
    <p>${escapeHtml(submission.query)}</p>
  `;
}

router.post("/", async (req, res) => {
  try {
    const {
      name,
      company,
      gender,
      age,
      email,
      phone,
      query,
      disposition
    } = req.body;

    if (
      !name ||
      !company ||
      !gender ||
      !age ||
      !email ||
      !phone ||
      !query ||
      !disposition
    ) {
      return res.status(400).json({ message: "Please fill in all fields." });
    }

    if (!allowedDispositions.includes(disposition)) {
      return res.status(400).json({ message: "Invalid disposition selected." });
    }

    const savedSubmission = await FormSubmission.create({
      name,
      company,
      gender,
      age,
      email,
      phone,
      query,
      disposition
    });

    const recipient = dispositionEmails[disposition];

    if (recipient) {
      const transporter = createTransporter();

      await transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: recipient,
        subject: "New Client Enquiry from MultyComm Form",
        html: buildEmailHtml(savedSubmission)
      });
    }

    return res.status(201).json({
      message: "Form submitted successfully.",
      data: savedSubmission
    });
  } catch (error) {
    console.error("Form submission error:", error);
    return res.status(500).json({
      message: "Something went wrong while submitting the form."
    });
  }
});

module.exports = router;
