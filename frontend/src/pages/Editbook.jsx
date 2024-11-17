import React, { useEffect, useState } from "react";
import axios from 'axios'
import Spinner from '../component/Spinner.jsx'
import { useNavigate } from "react-router-dom";
import styles from './editbook.module.css'; 
import { useParams } from 'react-router-dom'

const Createbook = () => {
  const [title, settitle] = useState("");
  const [author, setauthor] = useState("");
  const [publishyear, setpublishyear] = useState("");
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  console.log(id);
  
  const handlesavebook = async() => {
    const data = {title, author, publishyear};
    setloading(true);
    try {
      const response = await axios.put(`http://localhost:5000/book/edit/${id}`, data);
      setloading(false);
      navigate('/')
    } catch (error) {
      console.log(error.message);
      setloading(false);
      alert("error happended, check console");
    }
  }

  if (loading) {
    return <Spinner />;
  }
  return (
    <div className={styles.main_container}>
      <h1>Edit Book</h1>
      <div className={styles.secondary_container} >
        <div>
        <label >Title</label>
        <input type="text" value = {title} onChange={(e) => settitle(e.target.value)}/>  
        </div>

        <div>
        <label >Author</label>
        <input type="text" value = {author} onChange={(e) => setauthor(e.target.value)}/>  
        </div>

        <div>
        <label >PublishYear</label>
        <input type="number" value = {publishyear} onChange={(e) => setpublishyear(e.target.value)}/>  
        </div>
        <div>
          <button onClick={handlesavebook} className={styles.save_button}>save</button>  
        </div>

      </div> 
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
  )
}

export default Createbook
