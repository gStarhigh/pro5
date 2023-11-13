// React import
import React from "react";

// React Bootstrap import
import Spinner from "react-bootstrap/Spinner";

const Loader = ({ spinner, src, message }) => {
  return (
    <div className={`p-4`}>
      {spinner && <Spinner animation="border" />}
      {src && <img src={src} alt={message} />}
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default Loader;
