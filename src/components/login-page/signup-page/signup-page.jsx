import React, { Component } from "react";

import { connect } from "react-redux";
import { setSignUp } from "../../../redux/signup/signup.action";
import "./signup-page.styles.scss";

import axios from "axios";

class Signup extends Component {
  handleSubmit = event => {
    event.preventDefault();
    let email = this.refs.email.value;
    let password1 = this.refs.password1.value;
    let password2 = this.refs.password2.value;
    this.props.setSignUp(email, password1, password2);
    
    if (this.props.password1 === this.props.password2) {
      axios
        .post("http://127.0.0.1:8000/rest-auth/registration/", {
          email: this.props.email,
          password1: this.props.password1,
          password2: this.props.password2
        })
        .then(res => {
          console.log(res);
          this.props.setSignUp("", "", "");
        })
        .catch(err => {
          console.log(err.response);
          let { email, password1 } = err.response.data;
          this.props.setSignUp("", "", "");
        });
    }
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h1>SignUp Page</h1>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text/plain"
            ref="email"
            onChange={this.handleChange}
          />

          <label htmlFor="password1">Password</label>
          <input
            id="password1"
            type="password"
            ref="password1"
            onChange={this.handleChange}
          />

          <label htmlFor="password2">Confirm Password</label>
          <input
            id="password2"
            type="password"
            ref="password2"
            onChange={this.handleChange}
          />

          <button>Submit</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  email: state.signup.email,
  password1: state.signup.password1,
  password2: state.signup.password2
});

const mapDispatchToProps = dispatch => ({
  setSignUp: (email, password1, password2) =>
    dispatch(setSignUp(email, password1, password2))
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
