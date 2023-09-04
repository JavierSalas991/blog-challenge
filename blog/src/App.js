
import React, { useContext, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Navbar from "./components/Navbar";
import PostDetail from "./components/posts/PostDetail";
import Sidebar from "./components/user/Sidebar";
import Profile from "./components/user/Profile";
import UserContext from "./context/userContext/UserContext";
import Register from "./components/Register";
import Login from "./components/Login";
import { getCookie } from "./helpers/helper";
import Posts from "./components/posts/Posts";

function App() {

  const { user, setUser } = useContext(UserContext)

  // Function to load the user from cookies and save it in the context
  const saveUser = () => {
    try {
      const user = JSON.parse(getCookie("user"))
      setUser(user)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    saveUser()
  }, [])

  return (
    <div style={{
      height: "100vh",
      overflow: "auto"
    }}>
      <BrowserRouter>
        <Navbar></Navbar>
        <div className="row w-100 m-0 p-0">
          {user &&
            <div className="d-none d-md-block col-3 col-xl-2 m-0 p-0">
              <Sidebar />
            </div>
          }
          <div className={`col-12 col-md-9 col-xl-10 ${!user && "container"}`}>
            <Routes>
              <Route path="/" element={<Posts />} />
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="/postDetail/:id" element={<PostDetail />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div >
  );
}

export default App;