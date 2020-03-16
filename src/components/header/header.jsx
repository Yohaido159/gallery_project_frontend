import React, { Component } from "react";

import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <ul>
        <Link to="/">Home</Link>
        <Link to="/galleries">Gallery</Link>
        <Link to="/signup">SignUp</Link>
        <Link to="/login">Login</Link>
        <Link to="/user">User Profile</Link>
        <Link to="/utils">Utils</Link>
      </ul>
    );
  }
}

export default Header;
