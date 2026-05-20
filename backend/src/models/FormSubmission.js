const mongoose = require("mongoose");

const formSubmissionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    company: {
      type: String,
      required: true,
      trim: true
    },
    gender: {
      type: String,
      required: true,
      trim: true
    },
    age: {
      type: Number,
      required: true,
      min: 1
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    query: {
      type: String,
      required: true,
      trim: true
    },
    disposition: {
      type: String,
      required: true,
      enum: [
        "Customer Support",
        "Consultant Support",
        "B2B Lead",
        "New Lead",
        "General Enquiry"
      ]
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("FormSubmission", formSubmissionSchema);
