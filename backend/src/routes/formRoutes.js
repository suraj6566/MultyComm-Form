const express = require("express");
const FormSubmission = require("../models/FormSubmission");

const router = express.Router();

const dispositionEmails = {
  "Customer Support": "ayan@multycomm.com",
  "Consultant Support": "akash@multycomm.com",
  "B2B Lead": "deepak@multycomm.com",
  "New Lead": "aveek@multycomm.com"
};

const allowedDispositions = Object.keys(dispositionEmails).concat("General Enquiry");

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

    // Email sending is disabled for now so the form works without SMTP setup.
    // Later, use dispositionEmails[disposition] to find the recipient.
    // General Enquiry should not send any email.

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
