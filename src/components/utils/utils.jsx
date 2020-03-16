import React, { Component } from "react";

import { connect } from "react-redux";

import { Link, Redirect } from "react-router-dom";

class Utils extends Component {
  constructor(props) {
    super(props);
    this.state = {
      utilsPassword: "",
      submit: false,
      success: false,
      result: ""
    };
  }
  checkPermission = () => {
    const { utils_password } = this.props.user;

    let resultCheck;
    console.log(utils_password);
    if (utils_password !== this.state.utilsPassword) {
      console.log("not match");
      resultCheck = <h2>Try again</h2>;
    } else if (utils_password === this.state.utilsPassword || this.state.success === true) {
      console.log("match");
      this.setState({ success: true });
      resultCheck = (
        <div>
          <Link per={true} to="/upload">
            Upload
          </Link>
          <Link per={true} to="/multi">
            Upload Multi
          </Link>
        </div>
      );
    }
    return resultCheck;
  };

  handleInput = event => {
    if (this.props.user.utils_password !== this.state.utilsPassword) {
      this.setState({ utilsPassword: event.target.value });
    } else if (this.props.user.utils_password === this.state.utilsPassword) {
    }
  };

  handleButton = event => {
    this.setState({ submit: true });
    let result = this.checkPermission();
    this.setState({ result: result });
  };
  render() {
    return (
      <div>
        <h2>Utils</h2>
        <input type="text" onChange={this.handleInput} />
        <button onClick={this.handleButton}>Check</button>
        <div>{this.state.result}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  try {
    return {
      user: state.user.currentUser.user
    };
  } catch {
    return null;
  }
};

export default connect(mapStateToProps)(Utils);
