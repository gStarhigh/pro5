// React imports
import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

// React Bootstrap imports
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";

// Styles
import btnStyles from "../../styles/Button.module.css";
import styles from "../../styles/ContactForm.module.css";

// My own imports
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { AlertContext } from "../../contexts/AlertContext";

function ContactForm() {
  const currentUser = useCurrentUser();
  const history = useHistory();
  const { setAlert } = useContext(AlertContext);
  const [errors, setErrors] = useState({});

  const [contactData, setContactData] = useState({
    subject: "",
    message: "",
  });
  const { subject, message } = contactData;

  // Handles changes to the form
  const handleChange = (event) => {
    setContactData({
      ...contactData,
      [event.target.name]: event.target.value,
    });
  };

  // Handles cancel from the user
  const handleCancel = () => {
    history.goBack();
  };

  useEffect(() => {
    setContactData((prevState) => ({
      ...prevState,
      owner: currentUser?.id,
    }));
  }, [currentUser]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!currentUser) {
      history.push("/signin");
      return;
    }

    try {
      await axiosReq.post("/tickets/", contactData);
      setAlert("Message sent successfully!");
      history.push("/");
    } catch (err) {
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit} className={styles.Contact}>
      <Image
        className={styles.Image}
        // Image credit : https://unsplash.com/photos/black-and-brown-rotary-phone-near-gray-wall--0xCCPIbl3M
        src="https://res.cloudinary.com/draygqe7t/image/upload/v1699809639/pp5/pawel-czerwinski--0xCCPIbl3M-unsplash_1_w847t8.webp"
        fluid
        alt="a phone"
      />
      <Form.Group>
        <Form.Label htmlFor="name">Subject</Form.Label>
        <Form.Control
          type="text"
          name="subject"
          id="subject"
          value={subject}
          onChange={handleChange}
          placeholder="Subject"
          maxLength={150}
        />
      </Form.Group>
      {errors?.subject?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label htmlFor="message">Message</Form.Label>
        <Form.Control
          as="textarea"
          type="text"
          name="message"
          id="message"
          value={message}
          onChange={handleChange}
          rows={5}
          placeholder="Write your message here"
        />
      </Form.Group>
      {errors?.message?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <div className="text-center">
        <Button
          className={`${btnStyles.Button} ${btnStyles.Grey}`}
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          className={`${btnStyles.Button} ${btnStyles.Blue}`}
          type="submit"
        >
          Submit
        </Button>
      </div>
    </Form>
  );
}

export default ContactForm;
