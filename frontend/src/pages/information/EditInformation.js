// React imports
import React, { useState, useEffect, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";

// React Bootstrap imports
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Alert from "react-bootstrap/Alert";

// Styles
import btnStyles from "../../styles/Button.module.css";
import styles from "../../styles/ContactForm.module.css";

// My own imports
import { axiosReq } from "../../api/axiosDefaults";
import { AlertContext } from "../../contexts/AlertContext";

function EditInformation() {
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const { id } = useParams();
  const [infoData, setInfoData] = useState({
    start_date: "",
    end_date: "",
    text: "",
  });
  const { start_date, end_date, text } = infoData;

  const { setAlert } = useContext(AlertContext);

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/information/${id}/`);
        const { start_date, end_date, text, is_owner } = data;

        is_owner
          ? setInfoData({ start_date, end_date, text })
          : history.push("/");
      } catch (err) {}
    };

    handleMount();
  }, [history, id]);

  const handleChange = (event) => {
    setInfoData({
      ...infoData,
      [event.target.name]: event.target.value,
    });
  };

  const handleCancel = () => {
    history.goBack();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axiosReq.put(`/information/${id}/`, infoData);
      setAlert("Information updated successfully!");
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
        Update
      </Button>
    </Form>
  );
}

export default EditInformation;
