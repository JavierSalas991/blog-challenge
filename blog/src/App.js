
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
import PostDetail from "./components/posts/PostDetail";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div style={{
      height: "100vh",
      overflow: "auto"
    }}>
      <BrowserRouter>
        <UserState>
          <Navbar></Navbar>
          <div className="row w-100 m-0 p-0">
            <div className="d-none d-md-block col-3 m-0 p-0">
              <Sidebar/>
            </div>
            <div className="col-12 col-md-9 m-0 p-0">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/postDetail/:id" element={<PostDetail />} />
              </Routes>
            </div>
          </div>
        </UserState>
      </BrowserRouter>
    </div >
  );
}

export default App;
