import React from "react";
import { NavLink } from "react-router-dom";

export default function NavigationBar() {
  return (
    <nav>
      <ul>
        <li>
          {/* <a href="/">Home</a> */}
          <NavLink to="/" activeClassName="active" exact>
            Home
          </NavLink>{" "}
          {/*This way only grabs information needed doesnt reset page when every link is clicked... faster page loads*/}
        </li>
        <li>
          {/* <a href="/about">About</a> */}
          <NavLink to="/about" activeClassName="active" exact>
            About
          </NavLink>
        </li>
        <li>
          {/* <a href="/contact">Contact</a> */}
          <NavLink to="/contact" activeClassName="active" exact>
            Contact
          </NavLink>
        </li>
        <li>
          <NavLink to="/blog" activeClassName="active">
            Blog
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
