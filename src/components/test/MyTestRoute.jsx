import React from "react";
import { useParams } from "react-router-dom";

const MyTestRoute = () => {
  const { id } = useParams(); // Extracting the dynamic value

  return <div>Editing client with ID: {id}</div>;
};

export default MyTestRoute;
