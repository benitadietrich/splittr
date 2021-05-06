import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="https://bulma.io">
          <p style={{fontSize:"2rem"}}>TNP</p>
        </a>

        <NavLink className="navbar-item" to="/Home">Home</NavLink>
        <NavLink className="navbar-item" to="/Overview">Overview</NavLink>

      </div>
    </nav>
  );
};

export default Navbar;
