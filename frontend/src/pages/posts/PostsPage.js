// React imports
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

// React Bootstrap imports
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

// Styles
import styles from "../../styles/PostsPage.module.css";

// My own imports
import { axiosReq } from "../../api/axiosDefaults";
import Post from "./Post";
import Loader from "../../components/Spinner";
import NoResults from "../../assets/no-results.png";
import NavigationButtons from "../../components/NavigationButtons";
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles";
import InformationList from "../../components/Information";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Carousel1 from "../../components/Carousel";
import PostsButtons from "../../components/PostsButtons";

function PostsPage({ message, filter = "" }) {
  const [posts, setPosts] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();
  const currentUser = useCurrentUser();

  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/?${filter}search=${query}`);
        setPosts(data);
        setHasLoaded(true);
      } catch (err) {}
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchPosts();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, pathname]);

  return (
    <Row className={styles.Container}>
      <Carousel1 />
      <Col className=" text-center justify-content-center">
        {currentUser ? (
          <>
            <InformationList />
            <hr />
            <NavigationButtons />
            <hr />
          </>
        ) : null}
        <PopularProfiles />
        <hr />
        {currentUser ? <PostsButtons /> : null}
        <i className={`fas fa-search ${styles.SearchIcon}`} />
        <Form
          className={styles.SearchBar}
          onSubmit={(event) => event.preventDefault()}
        >
          <Form.Control
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="text"
            className="mr-sm-2"
            placeholder="Search posts"
          />
        </Form>
        {hasLoaded ? (
          <>
            {posts.results.length ? (
              <InfiniteScroll
                children={posts.results.map((post) => (
                  <Post key={post.id} {...post} setPosts={setPosts} />
                ))}
                dataLength={posts.results.length}
                loader={<Loader spinner />}
                hasMore={!!posts.next}
                next={() => fetchMoreData(posts, setPosts)}
              />
            ) : (
              <Container className={styles.Content}>
                <Loader src={NoResults} message={message} />
              </Container>
            )}
          </>
        ) : (
          <Container className={styles.Content}>
            <Loader spinner />
            <p>Loading...</p>
          </Container>
        )}
      </Col>
    </Row>
  );
}
export default PostsPage;
