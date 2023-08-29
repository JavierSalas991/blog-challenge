
import React from "react";
import Home from "./components/Home";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import Navbar from "./components/Navbar";


function App() {
  return (
    <div style={{
      height: "100vh",
      overflow: "auto"
  }}>
      <BrowserRouter>
      <Navbar></Navbar>
        <Routes>
          <Route path="/inicio" element={<Home />} />
          {/* <Route path="users/*" element={<Users />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
