import { useState } from "react";
import axios from "axios";

const dispositionOptions = [
  "Customer Support",
  "Consultant Support",
  "B2B Lead",
  "New Lead",
  "General Enquiry"
];

const initialFormData = {
  name: "",
  company: "",
  gender: "",
  age: "",
  email: "",
  phone: "",
  query: "",
  disposition: ""
};

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/form";

function App() {
  const [formData, setFormData] = useState(initialFormData);
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus("");

    try {
      await axios.post(API_URL, {
        ...formData,
        age: Number(formData.age)
      });

      setStatus("Form submitted successfully.");
      setFormData(initialFormData);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Unable to submit the form. Please try again.";
      setStatus(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="page">
      <section className="form-shell">
        <div className="form-header">
          <p className="eyebrow">MultyComm</p>
          <h1>Client Enquiry Form</h1>
          <p>Share the client details and route the enquiry to the right team.</p>
        </div>

        <form className="enquiry-form" onSubmit={handleSubmit}>
          <div className="field-grid">
            <label>
              Name
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter full name"
                required
              />
            </label>

            <label>
              Company
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Enter company name"
                required
              />
            </label>

            <label>
              Gender
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </label>

            <label>
              Age
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter age"
                min="1"
                required
              />
            </label>

            <label>
              Email
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                required
              />
            </label>

            <label>
              Phone
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                required
              />
            </label>
          </div>

          <label>
            Disposition
            <select
              name="disposition"
              value={formData.disposition}
              onChange={handleChange}
              required
            >
              <option value="">Select disposition</option>
              {dispositionOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label>
            Query
            <textarea
              name="query"
              value={formData.query}
              onChange={handleChange}
              placeholder="Write the client query"
              rows="5"
              required
            />
          </label>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Enquiry"}
          </button>

          {status && <p className="status-message">{status}</p>}
        </form>
      </section>
    </main>
  );
}

export default App;
