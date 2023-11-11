// React imports
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

// React Bootstrap imports
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

// Styles
import styles from "../../styles/CommentCreateEditForm.module.css";
import btnStyles from "../../styles/Button.module.css";

// My own imports
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { AlertContext } from "../../contexts/AlertContext";

function CommentCreateForm(props) {
  const { post, setPost, setComments, profileImage, profile_id } = props;
  const [content, setContent] = useState("");
  const { setAlert } = useContext(AlertContext);

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const handleCancel = () => {
    setContent("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosRes.post("/comments/", {
        content,
        post,
      });
      setComments((prevComments) => ({
        ...prevComments,
        results: [data, ...prevComments.results],
      }));
      setPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            comments_count: prevPost.results[0].comments_count + 1,
          },
        ],
      }));
      setContent("");
      setAlert("Your comment was created!");
    } catch (err) {}
  };

  return (
    <Form className="mt-2" onSubmit={handleSubmit}>
      <Form.Group>
        <InputGroup>
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profileImage} />
          </Link>
          <Form.Control
            className={styles.Form}
            placeholder="Post a comment..."
            as="textarea"
            value={content}
            onChange={handleChange}
            rows={2}
          />
        </InputGroup>
      </Form.Group>
      <div>
        <button
          className={`${btnStyles.Button} ${btnStyles.Grey}`}
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          className={`${btnStyles.Button} ${btnStyles.Blue} `}
          disabled={!content.trim()}
          type="submit"
        >
          Post
        </button>
      </div>
    </Form>
  );
}

export default CommentCreateForm;
