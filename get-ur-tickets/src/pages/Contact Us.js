import React, { useState } from 'react';
import Container from "react-bootstrap/Container";
import NewLogo from "../Pictures/newLogo.png";

export function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  const [formErrors, setFormErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false); // New state for loading animation

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setFormErrors({
      ...formErrors,
      [name]: ''
    });
  };

  const validateFirstName = (firstName) => {
    if (!firstName) return "First name is required.";
    const regex = /^[A-Za-z\s'-]+$/;
    if (!regex.test(firstName)) {
      return "First name can only contain letters, spaces, hyphens, and apostrophes.";
    }
    return '';
  };

  const validateLastName = (lastName) => {
    if (!lastName) return "Last name is required.";
    const regex = /^[A-Za-z\s'-]+$/;
    if (!regex.test(lastName)) {
      return "Last name can only contain letters, spaces, hyphens, and apostrophes.";
    }
    return '';
  };

  const validateEmail = (email) => {
    if (!email) return "Email is required.";
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(email)) {
      return "Invalid email format.";
    }
    return ''; 
  };

  const validateMessage = (message) => {
    if (!message) return "Message is required.";
    if (message.length < 10) return "Message must be at least 10 characters long.";
    const regex = /^[a-zA-Z0-9\s.,!?'"()&-]*$/;
    if (!regex.test(message)) {
      return "Message contains invalid characters. Only letters, spaces, commas, periods, and basic punctuation are allowed.";
    }
    return ''; 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {
      firstName: validateFirstName(formData.firstName),
      lastName: validateLastName(formData.lastName),
      email: validateEmail(formData.email),
      message: validateMessage(formData.message),
    };

    if (Object.values(errors).some((error) => error !== '')) {
      setFormErrors(errors);
      return;
    }

    setLoading(true); // Show "Sending" animation
    try {
      const response = await fetch("https://formsubmit.co/53714847cf04b6409207a7746e3a4174", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormSubmitted(true);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          message: ''
        });
      } else {
        console.error("Form submission failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false); // Hide "Sending" animation
    }
  };

  return (
    <Container fluid className='banner-container' style={{ padding: "0%", margin: "0%" }}>
      {/* Banner Section */}
      <div className="d-flex flex-column justify-content-center align-items-center" style={{ paddingTop: '5%' }}>
        <img src={NewLogo} alt="Logo" className="img-fluid" style={{ maxWidth: '200px', height: 'auto' }} />
        <div className="text-center mt-3" style={{ fontSize: '4rem', fontFamily: 'sans-serif' }}>
          GET UR TICKETS
        </div>
      </div>

      {/* Contact Us Section */}
      <div className="contact-info">
        <h2>Contact Us</h2>

        {!formSubmitted && !loading && (
          <div style={{ textAlign: 'center', marginBottom: '20px', fontSize: '1.2rem', color: 'white' }}>
            Please fill out all fields below.
          </div>
        )}

        {/* Form Submission Result */}
        {formSubmitted && (
          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '1.2rem', color: 'white' }}>
            Thank you! Your response has been recorded.
          </div>
        )}

        {/* Sending Animation */}
        {loading && (
          <div className='Second-Row-Ticket-Background' style={{ textAlign: 'center' }}>
            <div style={{ display: 'inline-block', color: 'white', fontSize: '20pt' }}>
              Sending
              <div className='dot'></div>
              <div className='dot'></div>
              <div className='dot'></div>
            </div> 
          </div>
        )}

        {/* Contact Form */}
        {!formSubmitted && !loading && (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px', margin: '20px auto' }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <div style={{ flex: 1 }}>
                <label>First Name:</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  style={{ width: '100%' }}
                />
                {formErrors.firstName && <div className="error-message">{formErrors.firstName}</div>}
              </div>
              <div style={{ flex: 1 }}>
                <label>Last Name:</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  style={{ width: '100%' }}
                />
                {formErrors.lastName && <div className="error-message">{formErrors.lastName}</div>}
              </div>
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                style={{ width: '100%' }}
              />
              {formErrors.email && <div className="error-message">{formErrors.email}</div>}
            </div>
            <div>
              <label>Message:</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                style={{ width: '100%', height: '150px' }}
              />
              {formErrors.message && <div className="error-message">{formErrors.message}</div>}
            </div>
            <button type="submit">Send Message</button>
          </form>
        )}
      </div>
    </Container>
  );
}
