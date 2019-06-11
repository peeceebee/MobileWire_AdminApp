import React, { Component } from "react";
import { NavLink } from "react-router-dom";

// SVG imports
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faCogs
} from "@fortawesome/free-solid-svg-icons";

library.add(faCalendarAlt, faCogs); 

export class Nav extends Component {
  render() {
    return (
      <nav>
        <ul className="nav-list">
          <NavLink className="nav-btn" to="/">
          <FontAwesomeIcon className="nav-icon" icon="calendar-alt" />
            Sign-In
          </NavLink>
          <NavLink className="nav-btn" to="/settings">
          <FontAwesomeIcon className="nav-icon" icon="cogs" />
            System Settings 
          </NavLink>
        </ul>
      </nav>
    );
  }
}

export default Nav;
