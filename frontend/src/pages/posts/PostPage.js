import React from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import styles from "../../styles/PostCreateEditForm.module.css";

function PostPage() {
  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p className="text-center">Popular profiles</p>
        <p className="text-center">Post component</p>
        <Container className={styles.Content}>Comments</Container>
      </Col>
    </Row>
  );
}

export default PostPage;
