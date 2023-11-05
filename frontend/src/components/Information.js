import { Table } from "react-bootstrap";
import { axiosReq } from "../api/axiosDefaults";
import React, { useEffect, useState } from "react";

function InformationList() {
  const [information, setInformation] = useState([]);

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
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default InformationList;
