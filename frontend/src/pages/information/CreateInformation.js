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
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { AlertContext } from "../../contexts/AlertContext";
import { axiosReq } from "../../api/axiosDefaults";

function CreateInformation() {
  const currentUser = useCurrentUser();
  const history = useHistory();
  const { setAlert } = useContext(AlertContext);
  const [errors, setErrors] = useState({});
  const [infoData, setInfoData] = useState({
    start_date: "",
    end_date: "",
    text: "",
  });
  const { start_date, end_date, text } = infoData;

  const handleChange = (event) => {
    setInfoData({
      ...infoData,
      [event.target.name]: event.target.value,
    });

    // If the user changed the start_date or end_date inputs, perform the validation check again
    if (
      event.target.name === "start_date" ||
      event.target.name === "end_date"
    ) {
      let newErrors = {};
      if (isDateInPast(start_date)) {
        newErrors.start_date = ["Start date cannot be in the past"];
      }
      if (isDateInPast(end_date)) {
        newErrors.end_date = ["End date cannot be in the past"];
      }
      setErrors(newErrors);
    }
  };

  const handleCancel = () => {
    history.goBack();
  };

  useEffect(() => {
    setInfoData((prevState) => ({
      ...prevState,
      owner: currentUser?.id,
    }));
  }, [currentUser]);

  const isDateInPast = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    now.setHours(0, 0, 0, 0); // Sets the time to 00:00:00 for today's date
    return date < now;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!currentUser) {
      history.push("/signin");
      setAlert("You must be signed in to create information");
      return;
    }

    // Store error messages
    let newErrors = {};

    // Check if start_date and end_date are in the past
    if (isDateInPast(start_date)) {
      newErrors.start_date = ["Start date cannot be in the past"];
    }
    if (isDateInPast(end_date)) {
      newErrors.end_date = ["End date cannot be in the past"];
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await axiosReq.post("/information/", infoData);
      setAlert("Information submitted successfully!"); // Set the alert message
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
        src="https://res.cloudinary.com/draygqe7t/image/upload/v1699698851/magdalena-smolnicka-xrxD8RaPIOg-unsplash_incngr.jpg"
        fluid
        alt="2 horses"
      />
      <Form.Group controlId="start_date">
        <Form.Label>Start date</Form.Label>
        <Form.Control
          type="date"
          name="start_date"
          value={start_date}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.start_date?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group controlId="end_date">
        <Form.Label>End Date</Form.Label>
        <Form.Control
          type="date"
          name="end_date"
          value={end_date}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.end_date?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group controlId="text">
        <Form.Label>Message</Form.Label>
        <Form.Control
          as="textarea"
          rows={2}
          name="text"
          value={text}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.text?.map((message, idx) => (
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
        Submit
      </Button>
    </Form>
  );
}

export default CreateInformation;
