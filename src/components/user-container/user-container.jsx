import React, { Component } from "react";

import { connect } from "react-redux";

class UserContainer extends Component {
  checkUser = () => {
    let userObj = this.props.user;
    if (userObj !== null) {
      // let userObj = userObj.user;
      console.log(userObj.user);
      let user = (
        <div>
          <h1>{userObj.user.email}</h1>
          <h3>{userObj.user.phone}</h3>
        </div>
      );
      return user;
    }
    return <h2>Not Exsist</h2>;
  };
  render() {
    return <div>{this.checkUser()}</div>;
  }
}

const mapStateToProps = state => ({
  user: state.user.currentUser
});

export default connect(mapStateToProps)(UserContainer);
