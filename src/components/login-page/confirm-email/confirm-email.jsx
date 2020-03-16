import React, { Component } from "react";

import axios from "axios";

class ConfirmEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    axios
      .get(
        `http://127.0.0.1:8000/rest-auth/registration/account-confirm-email/${this.props.match.params.key}`
      )
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }
  render() {
    return (
      <div>
        <h2>Your account confirm</h2>
      </div>
    );
  }
}
export default ConfirmEmail;
