// React imports
import React, { useState } from "react";

// React Bootstrap imports
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";

// Axios import
import axios from "axios";

// Styles
import btnStyles from "../../styles/Button.module.css";

function ContactForm() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { subject, message };
    try {
      await axios.post("/contact/", data);
      console.log("Form data successfully sent", data);
    } catch (error) {
      console.error("Error sending form data", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label htmlFor="name">Subject</Form.Label>
        <Form.Control
          type="text"
          name="subject"
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Subject"
          maxLength={150}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label htmlFor="message">Message</Form.Label>
        <Form.Control
          as="textarea"
          type="text"
          name="message"
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          placeholder="Write your message here"
        />
      </Form.Group>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default ContactForm;
