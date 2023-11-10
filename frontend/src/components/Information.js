// React imports
import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";

// React Bootstrap imports
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";

// Styles
import styles from "../styles/Information.module.css";

// My own imports
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { MoreDropdown } from "./MoreDropdown";
import { AlertContext } from "../contexts/AlertContext";
import Loader from "../components/Spinner";

function InformationList() {
  const [information, setInformation] = useState([]);
  const history = useHistory();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  const { setAlert } = useContext(AlertContext);

  useEffect(() => {
    axiosReq.get("/information/").then((response) => {
      if (Array.isArray(response.data.results)) {
        const now = new Date();
        const today = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate()
        );
        setHasLoaded(true);
        const filteredInformation = response.data.results.filter(
          (info) => new Date(info.end_date) >= today
        );
        setInformation(filteredInformation);
      } else {
        setInformation([]);
        setHasLoaded(false);
      }
    });
  }, []);

  const handleEdit = (id) => {
    history.push(`/information/${id}/edit`);
  };

  // Shows the confirmation modal
  const handleDelete = async (id) => {
    setShowConfirmation(true);
    setDeleteId(id);
  };

  // Handles the delete
  const confirmDelete = async () => {
    try {
      await axiosRes.delete(`/information/${deleteId}/`);
      setInformation(information.filter((info) => info.id !== deleteId));
      setAlert("Information deleted successfully!");
      history.push("/");
    } catch (err) {}
    setShowConfirmation(false);
  };
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return `${day}/${month}`;
  }

  return information.length > 0 ? (
    <Container className={styles.Information}>
      <h3>Information</h3>
      {hasLoaded ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Creator</th>
              <th>Message</th>
              <th>Date</th>
              {information.some((info) => info.is_owner) && (
                <th>
                  <i className="fa-regular fa-pen-to-square"></i>
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {information.map((info) => (
              <tr key={info.id}>
                <td>
                  <span>{info.owner ? info.owner : "Unknown User"}</span>
                </td>

                <td>{info.text}</td>
                <td>
                  {formatDate(info.start_date)} - {formatDate(info.end_date)}
                </td>
                {info.is_owner && (
                  <td>
                    <MoreDropdown
                      id={info.id}
                      handleEdit={() => handleEdit(info.id)}
                      handleDelete={() => handleDelete(info.id)}
                    />
                  </td>
                )}
              </tr>
            ))}
          </tbody>

          <Modal
            show={showConfirmation}
            onHide={() => setShowConfirmation(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this post?</Modal.Body>
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
        </Table>
      ) : (
        <Container className={styles.Content}>
          <Loader spinner />
          <p>Loading...</p>
        </Container>
      )}
    </Container>
  ) : null;
}

export default InformationList;
