import { axiosReq } from "../api/axiosDefaults";
import React, { useEffect, useState } from "react";

function InformationList() {
  const [information, setInformation] = useState([]);

  useEffect(() => {
    axiosReq.get("/information/").then((response) => {
      if (Array.isArray(response.data.results)) {
        const now = new Date();
        const filteredInformation = response.data.results.filter(
          (info) => new Date(info.end_date) >= now
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
    <ul>
      {information.map((info) => (
        <li key={info.id}>
          {info.start_date}
          {info.text}
          {info.end_date}
        </li>
      ))}
    </ul>
  );
}

export default InformationList;
