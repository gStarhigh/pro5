// React imports
import React, { useState } from "react";

// React Boostrap imports
import Form from "react-bootstrap/Form";

// Styles
import styles from "../../styles/CommentCreateEditForm.module.css";
import btnStyles from "../../styles/Button.module.css";

// My own imports
import { axiosRes } from "../../api/axiosDefaults";

function CommentEditForm(props) {
  const { id, content, setShowEditForm, setComments } = props;

  const [formContent, setFormContent] = useState(content);

  const handleChange = (event) => {
    setFormContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
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
    } catch (err) {}
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
