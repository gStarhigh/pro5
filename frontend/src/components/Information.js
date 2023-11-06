import { Table } from "react-bootstrap";
import { axiosReq } from "../api/axiosDefaults";
import React, { useEffect, useState } from "react";
import { MoreDropdown } from "./MoreDropdown";
import { useCurrentUser } from "../contexts/CurrentUserContext";

function InformationList() {
  const [information, setInformation] = useState([]);
  const currentUser = useCurrentUser();

  useEffect(() => {
    axiosReq.get("/information/").then((response) => {
      if (Array.isArray(response.data.results)) {
        const now = new Date();
        const today = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate()
        );
        const filteredInformation = response.data.results.filter(
          (info) => new Date(info.end_date) >= today
        );
        setInformation(filteredInformation);
        console.log("Filtered information:", filteredInformation);
      } else {
        setInformation([]);
        console.log("Didn't find anything");
      }
    });
  }, []);

  const handleEdit = () => {};

  const handleDelete = () => {};

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Creator</th>
          <th>Message</th>
          <th>Start</th>
          <th>End</th>
        </tr>
      </thead>
      <tbody>
        {information.map((info) => (
          <tr key={info.id}>
            <td>{info.user ? info.user : "Unknown User"}</td>
            <td>{info.text}</td>
            <td>{info.start_date}</td>
            <td>{info.end_date}</td>
            <div className="d-flex align-items-center">
              {info.is_owner && (
                <MoreDropdown>
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                </MoreDropdown>
              )}
            </div>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default InformationList;
