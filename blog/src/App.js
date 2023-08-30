
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
import UserState from "./context/userContext/UserState";


function App() {
  return (
    <div style={{
      height: "100vh",
      overflow: "auto"
    }}>
      <BrowserRouter>
        <UserState>
          <Navbar></Navbar>
          <Routes>
            <Route path="/inicio" element={<Home />} />
            {/* <Route path="/user*" element={<User />} /> */}
          </Routes>
        </UserState>
      </BrowserRouter>
    </div >
  );
}

export default App;
