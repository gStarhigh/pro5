// React
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import InfiniteScroll from "react-infinite-scroll-component";

// React Bootstrap imports
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

// Styles
import styles from "../../styles/PostCreateEditForm.module.css";
import commentStyles from "../../styles/Comment.module.css";

// My own imports
import { axiosReq } from "../../api/axiosDefaults";
import { fetchMoreData } from "../../utils/utils";
import Post from "./Post";
import CommentCreateForm from "../comments/CommentCreateForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Comment from "../comments/Comment";
import Loader from "../../components/Spinner";

function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState({ results: [] });
  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const [comments, setComments] = useState({ results: [] });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: post }, { data: comments }] = await Promise.all([
          axiosReq.get(`/posts/${id}`),
          axiosReq.get(`/comments/?post=${id}`),
        ]);
        setPost({ results: [post], is_owner: post.is_owner });
        setComments(comments);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    handleMount();
  }, [id]);

  if (loading) {
    return (
      <Container className={commentStyles.Loader}>
        <Loader spinner />
        <p>Loading...</p>
      </Container>
    );
  }

  return (
    <Row className="h-100">
      <Col className="text-center my-auto" lg={{ span: 8, offset: 2 }}>
        <p className={styles.PopProfiles}>Popular profiles</p>
        <Post {...post.results[0]} setPosts={setPost} postPage />
        <Container className={styles.Content}>
          {currentUser ? (
            <CommentCreateForm
              profile_id={currentUser.profile_id}
              profileImage={profile_image}
              post={id}
              setPost={setPost}
              setComments={setComments}
            />
          ) : comments.results.length ? (
            "Comments"
          ) : null}
          {comments.results.length ? (
            <InfiniteScroll
              children={comments.results.map((comment) => (
                <Comment
                  key={comment.id}
                  {...comment}
                  setPost={setPost}
                  setComments={setComments}
                  isOwner={currentUser?.profile_id === comment.profile_id}
                  isPostOwner={post.results[0]?.user === comment.profile_id}
                />
              ))}
              dataLength={comments.results.length}
              loader={<Loader spinner />}
              hasMore={!!comments.next}
              next={() => fetchMoreData(comments, setComments)}
            />
          ) : currentUser ? (
            <span>No comments yet, be the first to comment!</span>
          ) : (
            <span>No comments... yet</span>
          )}
        </Container>
      </Col>
    </Row>
  );
}

export default PostPage;
