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

  const [formSubmitted, setFormSubmitted] = useState(false); // Track form submission state

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setFormErrors({
      ...formErrors,
      [name]: ''  // Reset error message when user starts typing
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = {
      firstName: validateFirstName(formData.firstName),
      lastName: validateLastName(formData.lastName),
      email: validateEmail(formData.email),
      message: validateMessage(formData.message)
    };

    if (Object.values(errors).some((error) => error !== '')) {
      setFormErrors(errors);
      return; // Stop submission if there are errors
    }

    console.log('Form submitted:', formData);

    setFormSubmitted(true); // Set form submission state to true

    // Reset form data after submission
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      message: ''
    });
  };

  return (
    <Container fluid className='banner-container' style={{ padding: "0%", margin: "0%" }}>
      {/* Banner Section */}
      <div className="d-flex flex-column justify-content-center align-items-center" style={{ paddingTop:'5%' }}>
        <img src={NewLogo} alt="Logo" className="img-fluid" style={{ maxWidth: '200px', height: 'auto' }} />
        <div className="text-center mt-3" style={{ fontSize: '4rem', fontFamily: 'sans-serif' }}>
          GET UR TICKETS
        </div>
      </div>

      {/* Contact Us Section */}
      <div className="contact-info">
        <h2>Contact Us</h2>

        {formSubmitted ? (
          // Thank you message displayed after form submission
          <div style={{ 
            textAlign: 'center', 
            marginTop: '20px', 
            fontSize: '1.2rem', 
            color: 'white' // Set the thank you message color to white
          }}>
            Thank you! Your response has been recorded.
          </div>
        ) : (
          // Form displayed when not submitted
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px', margin: '20px auto' }}>
            {/* First Name and Last Name fields */}
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

            {/* Email field */}
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

            {/* Message field */}
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

            {/* Submit button */}
            <button type="submit">Send Message</button>
          </form>
        )}
      </div>
    </Container>
  );
}
