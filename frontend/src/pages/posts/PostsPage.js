import React from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import styles from "../../styles/PostsPage.module.css";

function PostsPage() {
  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2 text-center" lg={12}>
        <p>Information from users will go here in a list</p>
        <p>Navigation buttons here</p>
        <p>Popular profiles</p>
        <p>Search bar here</p>
        <p>List of posts here</p>
      </Col>
    </Row>
  );
}

export default PostsPage;
