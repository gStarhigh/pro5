// React imports
import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

// React Bootstrap imports
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// Styles
import btnStyles from "../../styles/Button.module.css";

// My own imports
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { AlertContext } from "../../contexts/AlertContext";
import { axiosReq } from "../../api/axiosDefaults";

function CreateInformation() {
  const currentUser = useCurrentUser();
  const history = useHistory();
  const { setAlert } = useContext(AlertContext); // Use the useContext hook to access the setAlert function

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
  };

  useEffect(() => {
    setInfoData((prevState) => ({
      ...prevState,
      owner: currentUser?.id,
    }));
  }, [currentUser]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(infoData);

    if (!currentUser) {
      history.push("/signin");
      return;
    }

    try {
      await axiosReq.post("/information/", infoData);
      setAlert("Information submitted successfully!"); // Set the alert message
      history.push("/");
      console.log("Sucessfully submitted");
    } catch (err) {
      if (err.response?.status !== 401) {
        console.log(err);
        console.log(err.response?.data);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="start_date">
        <Form.Label>Start date</Form.Label>
        <Form.Control
          type="date"
          name="start_date"
          value={start_date}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="end_date">
        <Form.Label>End Date</Form.Label>
        <Form.Control
          type="date"
          name="end_date"
          value={end_date}
          onChange={handleChange}
        />
      </Form.Group>

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
      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => {
          history.goBack();
        }}
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
