// React imports
import React from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";

// React Bootstrap imports
import {
  Form,
  Button,
  Image,
  Col,
  Row,
  Container,
  Alert,
} from "react-bootstrap";

// Styles
import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";

// My own imports
import axios from "axios";

/* Sets username and passwords to an empty string */
const SignUpForm = () => {
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });

  /* Stores the Errors */
  const [errors, setErrors] = useState({});
  /* Checks the users history */
  const history = useHistory();

  /* Stores the username and passwords */
  const { username, password1, password2 } = signUpData;

  /* Handle changes to the inputs */
  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
  };

  /* Handles the submit action */
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/dj-rest-auth/registration/", signUpData);
      history.push("/signin");
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <Row className={styles.Row}>
      <Col
        md={6}
        className={`my-auto d-none d-md-block p-2 ${styles.SignUpCol}`}
      >
        <Image
          className={styles.SignInImage}
          src={
            "https://res.cloudinary.com/draygqe7t/image/upload/v1691501957/240594785_373990104267691_8073872753669794635_n_xammpg.jpg"
          }
        />
      </Col>
      <Col className="my-auto py-2 p-md-2" md={6}>
        <Container className={`${styles.Content} p-4 `}>
          <h1 className={styles.Header}>Sign up</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                className={styles.Input}
                type="text"
                placeholder="Enter Username"
                name="username"
                value={username}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.username?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <Form.Group controlId="Password1">
              <Form.Label>Password</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="Password"
                name="password1"
                value={password1}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password1?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
            <Form.Group controlId="Password2">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="Confirm Password"
                name="password2"
                value={password2}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password2?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
            <Button
              className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`}
              type="submit"
            >
              Sign Up
            </Button>
          </Form>
          <div className={`mt-3 ${styles.Content}`}>
            <Link className={styles.Link} to="/signin">
              Already have an account? <span>Sign in</span>
            </Link>
          </div>
        </Container>
      </Col>
    </Row>
  );
};

export default SignUpForm;
