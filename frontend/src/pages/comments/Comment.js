import React, { useState } from "react";
import { Media } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Avatar from "../../components/Avatar";
import styles from "../../styles/Comment.module.css";
import { MoreDropdown } from "../../components/MoreDropdown";
import { axiosRes } from "../../api/axiosDefaults";
import { Modal, Button } from "react-bootstrap";

const Comment = (props) => {
  const {
    profile_id,
    profile_image,
    owner,
    updated_at,
    content,
    isOwner,
    setPost,
    setComments,
    id,
  } = props;
  const [showConfirmation, setShowConfirmation] = useState(false);
  const history = useHistory();

  const handleEdit = () => {
    history.push(`/comments/${id}/edit`);
  };

  const handleDelete = async () => {
    setShowConfirmation(true);
  };

  const confirmDelete = async () => {
    try {
      await axiosRes.delete(`/comments/${id}/`);
      setPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            comments_count: prevPost.results[0].comments_count - 1,
          },
        ],
      }));

      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.filter((comment) => comment.id !== id),
      }));
    } catch (err) {}
    setShowConfirmation(false);
  };

  return (
    <div>
      <hr />
      <Media>
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} />
        </Link>
        <Media.Body className="text-left">
          <span
            className={`${styles.Owner} ${
              isOwner ? styles.OwnerHighlight : styles.OtherUserHighlight
            }`}
          >
            {owner}
          </span>

          <span className={styles.Date}>{updated_at}</span>
          <p>{content}</p>
        </Media.Body>
        {isOwner && (
          <MoreDropdown handleEdit={handleEdit} handleDelete={handleDelete} />
        )}
      </Media>
      <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this comment?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmation(false)}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Comment;
