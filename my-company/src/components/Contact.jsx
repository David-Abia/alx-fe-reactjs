import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted!");
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Contact Us</h1>

      <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "auto" }}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          style={{ display: "block", width: "100%", margin: "10px 0", padding: "8px" }}
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          style={{ display: "block", width: "100%", margin: "10px 0", padding: "8px" }}
        />

        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          style={{ display: "block", width: "100%", margin: "10px 0", padding: "8px" }}
        />

        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "navy",
            color: "white",
            border: "none",
          }}
        >
          Send Message
        </button>
      </form>
    </div>
  );
}

export default Contact;