import React, { Component } from "react";

import { connect } from "react-redux";

import { setLoginUser } from "../../../redux/login/login.action";
import { setCurrentUser } from "../../../redux/user/user.action";

import "./login-page.styles.scss";

import axios from "axios";

class LoginPage extends Component {
  handleSubmit = event => {
    event.preventDefault();
    axios
      .post("http://127.0.0.1:8000/rest-auth/login/", {
        email: this.props.email,
        username: this.props.phone,
        password: this.props.password
      })
      .then(res => {
        console.log(res);
        this.props.setUser(res.data);
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  handleChangeEmail = event => {
    this.props.setLogin(
      event.target.value,
      this.props.password,
      this.props.phone
    );
  };

  handleChangePassword = event => {
    this.props.setLogin(this.props.email, event.target.value, this.props.phone);
  };

  handleChangePhone = event => {
    this.props.setLogin(
      this.props.email,
      this.props.password,
      event.target.value
    );
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h1>Login Page</h1>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text/plain"
            name="email"
            onChange={this.handleChangeEmail}
          />

          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            type="text/plain"
            name="phone"
            onChange={this.handleChangePhone}
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            onChange={this.handleChangePassword}
          />

          <button>Submit</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  email: state.login.email,
  password: state.login.password,
  phone: state.login.phone,
  user: state.user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setLogin: (email, password, phone) =>
    dispatch(setLoginUser(email, password, phone)),
  setUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
