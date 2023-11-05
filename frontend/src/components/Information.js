import { axiosReq } from "../api/axiosDefaults";
import React, { useEffect, useState } from "react";

function InformationList() {
  const [information, setInformation] = useState([]);

  useEffect(() => {
    axiosReq.get("/information/").then((response) => {
      const now = new Date();
      const filteredInformation = response.data.filter(
        (info) =>
          new Date(info.start_date) <= now && new Date(info.end_date) >= now
      );
      setInformation(filteredInformation);
    });
  }, []);

  return (
    <ul>
      {information.map((info) => (
        <li key={info.id}>{info.text}</li>
      ))}
    </ul>
  );
}

export default InformationList;
