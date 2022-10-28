import React from "react";
import { Link, Route, Routes } from "react-router-dom";

const About = () => {
   
   return (
      <div>
         <h1>About our team</h1>
         <Link to='team'>Let introduse our team</Link>
         <Routes>
            <Route path='team' element={<p>Our Team</p>}/>
         </Routes>
      </div>
   )
};

export default About