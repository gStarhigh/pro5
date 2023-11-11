// React imports
import React, { useState, useContext } from "react";

// React Bootstrap imports
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

// Styles
import styles from "../../styles/CommentCreateEditForm.module.css";
import btnStyles from "../../styles/Button.module.css";

// My own imports
import { axiosRes } from "../../api/axiosDefaults";
import { AlertContext } from "../../contexts/AlertContext";

function CommentEditForm(props) {
  const { id, content, setShowEditForm, setComments } = props;
  const [errors, setErrors] = useState({});
  const [formContent, setFormContent] = useState(content);
  const { setAlert } = useContext(AlertContext);

  const handleChange = (event) => {
    setFormContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formContent.trim()) {
      setErrors({
        formContent: [
          "Comment cannot be empty. Choose delete if you want to erase this comment.",
        ],
      });
      return;
    }

    try {
      await axiosRes.put(`/comments/${id}/`, {
        content: formContent.trim(),
      });
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.map((comment) => {
          return comment.id === id
            ? {
                ...comment,
                content: formContent.trim(),
                updated_at: "now",
              }
            : comment;
        }),
      }));
      setShowEditForm(false);
      setAlert("Your comment was updated!");
    } catch (err) {
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="pr-1">
        <Form.Control
          className={styles.Form}
          as="textarea"
          value={formContent}
          onChange={handleChange}
          rows={2}
        />
      </Form.Group>
      {errors?.formContent?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <div className="text-right">
        <button
          className={`${btnStyles.Button} ${btnStyles.Grey}`}
          onClick={() => setShowEditForm(false)}
          type="button"
        >
          Cancel
        </button>
        <button
          className={`${btnStyles.Button} ${btnStyles.Blue}`}
          disabled={!content.trim()}
          type="submit"
        >
          Save
        </button>
      </div>
    </Form>
  );
}

export default CommentEditForm;
