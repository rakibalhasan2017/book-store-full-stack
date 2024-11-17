import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../component/Spinner.jsx";

const Deletebook = () => {
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams(); // Extract `id` from URL

  const handledeletebook = async () => {
    setloading(true); // Show the spinner
    try {
      const response = await axios.delete(`http://localhost:5000/book/delete/${id}`); // DELETE request
      console.log(response.data); // Log the response from the backend
      setloading(false); // Stop the spinner
      navigate("/"); // Redirect to the home page
    } catch (error) {
      console.error("Error while deleting the book:", error); // Log the error
      setloading(false); // Stop the spinner
      alert("An error occurred while deleting the book."); // Show alert
    }
  };

  if (loading) {
    return <Spinner />; // Show the spinner while loading
  }

  return (
    <div style={{ margin: "20px", padding: "20px", border: "1px solid #ddd", borderRadius: "5px" }}>
      <h1>Delete Book</h1>
      <div style={{ marginTop: "20px" }}>
        <h2>Are you sure you want to delete this book?</h2>
        <button
          onClick={handledeletebook}
          style={{
            padding: "10px 20px",
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Yes, delete
        </button>
        <button
          onClick={() => navigate("/")}
          style={{
            marginLeft: "10px",
            padding: "10px 20px",
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Deletebook;
