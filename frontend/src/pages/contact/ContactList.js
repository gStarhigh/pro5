// React imports
import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";

// React Bootstrap imports
import { Table, Container, Modal, Button } from "react-bootstrap";

// My own imports
import { axiosReq, axiosRes } from "../../api/axiosDefaults";
import { AlertContext } from "../../contexts/AlertContext";
import Loader from "../../components/Spinner";
import { MoreDropdown } from "../../components/MoreDropdown";

function ContactList() {
  const [contactData, setContactData] = useState([]);
  const history = useHistory();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  const { setAlert } = useContext(AlertContext);

  useEffect(() => {
    setHasLoaded(false);
    axiosReq.get("/tickets/").then((response) => {
      if (Array.isArray(response.data.results)) {
        setContactData(response.data.results);
      } else {
        setContactData([]);
      }
      setHasLoaded(true);
    });
  }, []);

  // Handles the edit push to contactEditForm.
  const handleEdit = (id) => {
    history.push(`/tickets/${id}/edit`);
  };

  // Shows the confirmation modal
  const handleDelete = async (id) => {
    setShowConfirmation(true);
    setDeleteId(id);
  };

  // Handles the delete
  const confirmDelete = async () => {
    try {
      await axiosRes.delete(`/tickets/${deleteId}/`);
      setContactData(contactData.filter((tickets) => tickets.id !== deleteId));
      setAlert("Ticket deleted successfully!");
    } catch (err) {
      console.log(err);
      console.log(deleteId);
    }
    setShowConfirmation(false);
  };

  return (
    <Container>
      {hasLoaded ? (
        contactData.length ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Subject</th>
                <th>Message</th>
                <th>Status</th>
                {contactData.some((tickets) => tickets.is_owner) && (
                  <th>
                    <i className="fa-regular fa-pen-to-square"></i>
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {contactData.map((tickets) => (
                <tr key={tickets.id}>
                  <td>{tickets.subject}</td>
                  <td>{tickets.message}</td>
                  <td>{tickets.ticket_status}</td>
                  {tickets.is_owner && (
                    <MoreDropdown
                      handleEdit={() => handleEdit(tickets.id)}
                      handleDelete={() => handleDelete(tickets.id)}
                    />
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
              <Modal.Body>
                Are you sure you want to delete this ticket?
              </Modal.Body>
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
          <p>You have no tickets</p>
        )
      ) : (
        <Container className="text-center justify-content-center">
          <Loader spinner />
          <p>Loading...</p>
        </Container>
      )}
    </Container>
  );
}

export default ContactList;
