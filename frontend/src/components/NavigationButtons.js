// React imports
import React from "react";
import { Link } from "react-router-dom";

// React Bootstrap import
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

// Styles
import styles from "../styles/NavigationButtons.module.css";

// My own import
import { useCurrentUser } from "../contexts/CurrentUserContext";

const NavigationButtons = () => {
  const currentUser = useCurrentUser();
  return (
    <Container className={styles.Container}>
      {currentUser ? (
        <>
          <Row className={styles.Row}>
            <Col className={styles.Col}>
              <Link to="/posts/create">
                <div className={styles.Button}>
                  <Image
                    className={styles.Image}
                    src="https://res.cloudinary.com/draygqe7t/image/upload/v1699809639/pp5/gene-devine-ahxNfsInPVM-unsplash_ol4cq6.webp"
                    fluid
                    alt="running horses"
                  />
                  <p>Create Post</p>
                </div>
              </Link>
            </Col>
            <Col className={styles.Col}>
              <Link to="/createinformation">
                <div className={styles.Button}>
                  <Image
                    className={styles.Image}
                    src="https://res.cloudinary.com/draygqe7t/image/upload/v1699810073/pp5/magdalena-smolnicka-xrxD8RaPIOg-unsplash_incngr_glznpe.webp"
                    fluid
                    alt="2 horses"
                  />
                  <p>Create info</p>
                </div>
              </Link>
            </Col>
          </Row>
        </>
      ) : null}
    </Container>
  );
};

export default NavigationButtons;
