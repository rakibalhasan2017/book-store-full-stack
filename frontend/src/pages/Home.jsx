import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Spinner from "../component/Spinner.jsx";
import styles from "./home.module.css"; // Import the CSS Module

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/book");
        setBooks(Array.isArray(response.data) ? response.data : response.data.data || []);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className={styles.main_container}>
      <div className={styles.book_container}>
        <h1 className={styles.book_title}>Book List</h1>
        <Link to="/book/create" className={styles.create_link}>
          Create New Book
        </Link>
      </div>
      <table className={styles.book_table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Published Year</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? styles.even_row : styles.odd_row}
            >
              <td>{book._id}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.publishyear}</td>
              <td>
                <div className={styles.operations_column}>
                <Link to={`/book/details/${book._id}`} className={styles.operations_link}>
                Info
                </Link>
                  <Link to={`/book/edit/${book.book_containerid}`} className={styles.operations_link}>
                    Edit
                  </Link>
                  <Link to={`/book/delete/${book._id}`} className={styles.operations_link}>
                    Delete
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
