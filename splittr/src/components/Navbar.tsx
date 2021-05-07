import React from "react";
import { NavLink, Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/Home">
          <p style={{fontSize:"2rem"}}>Splittr</p>
        </Link>

        <NavLink className="navbar-item" to="/Home">Home</NavLink>
        {/* <NavLink className="navbar-item" to="/Overview">Overview</NavLink> */}

      </div>
    </nav>
  );
};

export default Navbar;
