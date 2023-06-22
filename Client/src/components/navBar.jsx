import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { HomeOutlined } from "@mui/icons-material";
import auth from "../services/authService";

const NavBar = ({ user }) => {
  const [colapse, setColapse] = useState(false);
  const handleColapse = () => {
    setColapse(!colapse);
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand " style={{ flexGrow: 1 }} to="/">
        <HomeOutlined color="action" fontSize="large" />
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
