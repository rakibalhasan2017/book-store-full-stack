import React, { useEffect, useState } from "react";
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Spinner from '../component/Spinner.jsx'


const Showbook = () => {
  const [book, setBook] = useState([]);
  const [loading, setloading] = useState(true);
  const {id} = useParams();
  // console.log("Extracted ID:", id);
  useEffect(() => {
    const fetchData = async () => {
      setloading(true);
      try {
        const response = await axios.get(`http://localhost:5000/book/details/${id}`);
        console.log(response.data);
        setBook(response.data.data);
        setloading(false);
      } catch (error) {
        console.log(error.message);
        setloading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div style={{ margin: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '5px' }}>
      <h1>Book Details</h1>
      <p><strong>Title:</strong> {book.title}</p>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Published Year:</strong> {book.publishyear}</p>
      <div style={{ marginTop: '20px' }}>
        <button
          onClick={() => window.history.back()} // Go back to the previous page
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Back
        </button>
      </div>
    </div>
  );
};


export default Showbook
