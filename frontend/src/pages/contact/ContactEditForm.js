// React imports
import React, { useState, useEffect, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";

// React Bootstrap imports
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

// Styles
import btnStyles from "../../styles/Button.module.css";
import styles from "../../styles/ContactForm.module.css";

// My own imports
import { axiosReq } from "../../api/axiosDefaults";
import { AlertContext } from "../../contexts/AlertContext";

function EditTicket() {
  const history = useHistory();
  const { id } = useParams();
  const [ticketData, setTicketData] = useState({
    subject: "",
    message: "",
  });
  const { subject, message } = ticketData;
  const [errors, setErrors] = useState({});
  const { setAlert } = useContext(AlertContext);

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/tickets/${id}/`);
        const { subject, message, is_owner } = data;

        is_owner ? setTicketData({ subject, message }) : history.push("/");
      } catch (err) {}
    };

    handleMount();
  }, [history, id]);

  const handleChange = (event) => {
    setTicketData({
      ...ticketData,
      [event.target.name]: event.target.value,
    });
  };

  const handleCancel = () => {
    history.goBack();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axiosReq.put(`/tickets/${id}/`, ticketData);
      setAlert("Ticket updated successfully!");
      history.goBack();
    } catch (err) {
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit} className={styles.Contact}>
      <Form.Group controlId="subject">
        <Form.Label>Subject</Form.Label>
        <Form.Control
          type="text"
          name="subject"
          value={subject}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.subject?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group controlId="message">
        <Form.Label>Message</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          name="message"
          value={message}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.message?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Button
        className={`${btnStyles.Button} ${btnStyles.Grey}`}
        onClick={handleCancel}
      >
        Cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        Update
      </Button>
    </Form>
  );
}

export default EditTicket;
