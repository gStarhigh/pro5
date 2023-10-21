import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Post from "./Post";
import Loader from "../../components/Spinner";

import styles from "../../styles/PostsPage.module.css";
import { useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";

import NoResults from "../../assets/no-results.png";

function PostsPage({ message, filter = "" }) {
  const [posts, setPosts] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/?${filter}`);
        setPosts(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    fetchPosts();
  }, [filter, pathname]);

  return (
    <Row className={styles.Container}>
      <Col className=" text-center justify-content-center">
        <p>Information from users will go here in a list</p>
        <p>Navigation buttons here</p>
        <p>Popular profiles</p>
        <p>Search bar here</p>
        <p>List of posts here</p>
        {hasLoaded ? (
          <>
            {posts.results.length ? (
              posts.results.map((post) => (
                <Post key={post.id} {...post} setPosts={setPosts} />
              ))
            ) : (
              <Container className={styles.Content}>
                <Loader src={NoResults} message={message} />
              </Container>
            )}
          </>
        ) : (
          <Container className={styles.Content}>
            <Loader spinner />
          </Container>
        )}
      </Col>
    </Row>
  );
}
export default PostsPage;
