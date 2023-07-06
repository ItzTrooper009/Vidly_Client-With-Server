import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { HomeOutlined } from "@mui/icons-material";
import auth from "../services/authService";
import { Button } from "@mui/material";

const NavBar = ({ user }) => {
  const [colapse, setColapse] = useState(false);
  const handleColapse = () => {
    setColapse(!colapse);
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand " style={{ flexGrow: 1 }} to="/">
        <Button
          style={{
            border: "none",
            outline: "none",
            backgroundColor: "#e0e0e0",
          }}
          startIcon={<HomeOutlined color="action" fontSize="large" />}
        >
          {/* <HomeOutlined color="action" fontSize="large" /> */}
          <span style={{ color: "black" }}>Home</span>
        </Button>
      </Link>
      <button className="navbar-toggler" type="button" onClick={handleColapse}>
        <span className="navbar-toggler-icon" />
      </button>
      <div
        className={`navbar-new ${colapse ? "nopen" : "nclose"}`}
        id="navbarNavAltMarkup"
      >
        <div className="navbar-nav">
          <NavLink className="nav-item nav-link" to="/movies">
            Movies
          </NavLink>
          <NavLink className="nav-item nav-link" to="/customers">
            Customers
          </NavLink>
          <NavLink className="nav-item nav-link" to="/rentals">
            Rentals
          </NavLink>
          {!user && (
            <React.Fragment>
              <NavLink className="nav-item nav-link" to="/login">
                Login
              </NavLink>
              <NavLink className="nav-item nav-link" to="/register">
                Register
              </NavLink>
            </React.Fragment>
          )}
          {user && (
            <React.Fragment>
              <NavLink className="nav-item nav-link" to="/profile">
                {user.name}
              </NavLink>
              <Link to="#" className="nav-item nav-link" onClick={auth.logout}>
                logout
              </Link>
            </React.Fragment>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
