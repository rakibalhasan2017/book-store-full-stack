import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Createbook from './pages/Createbook.jsx';
import Deletebook from './pages/Deletebook.jsx';
import Editbook from './pages/Editbook.jsx';
import Showbook from './pages/Showbook.jsx';

function App() {


  return (
    <>
    <Routes>
      <Route path = '/' element = {<Home />} />
      <Route path = '/book/create' element = {<Createbook/>}/>
      <Route path= "/book/details/:id" element={<Showbook />} />
      <Route path = "/book/edit/:id" element = {<Editbook/>}/>
      <Route path = "/book/delete/:id" element = {<Deletebook/>}/>
    </Routes>
    </>
  )
}

export default App
