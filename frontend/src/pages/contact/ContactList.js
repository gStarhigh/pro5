// React imports
import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";

// React Bootstrap imports
import { Table, Container } from "react-bootstrap";

// My own imports
import { axiosReq } from "../../api/axiosDefaults";
import { AlertContext } from "../../contexts/AlertContext";
import Loader from "../../components/Spinner";

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
              </tr>
            </thead>
            <tbody>
              {contactData.map((contact) => (
                <tr key={contact.id}>
                  <td>{contact.subject}</td>
                  <td>{contact.message}</td>
                  <td>{contact.ticket_status}</td>
                </tr>
              ))}
            </tbody>
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
