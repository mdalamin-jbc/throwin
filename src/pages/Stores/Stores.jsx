import { useEffect, useState } from "react";

const Stores = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/stores.json") // Make sure the file path is correct and that stores.json is in the public folder
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok"); // Handle HTTP errors
        return res.json();
      })
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching JSON data:", error));
  }, []);

  return <div>Stores</div>;
};

export default Stores;
