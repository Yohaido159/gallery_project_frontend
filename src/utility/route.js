import React, { Component } from "react";

import { Switch, Route } from "react-router-dom";

import Header from "../components/header/header";
import GalleryMain from "../components/gallery-page/gallery-main/gallery-main";
import GalleryDetail from "../components/gallery-page/gallery-detail/gallery-detail";
import Signup from "../components/login-page/signup-page/signup-page";
import Login from "../components/login-page/login-page/login-page";
import ConfirmEmail from "../components/login-page/confirm-email/confirm-email";
import UserContainer from "../components/user-container/user-container";
import Upload from "../components/gallery-page/upload/upload";
import UploadMultiImage from "../components/gallery-page/upload-multi-image/upload-multi-image";

class Routes extends Component {
  getGallery = props => {
    let user = props.match.params.galUser;
    let title = props.match.params.galName;
    return <GalleryDetail user={user} title={title} />;
  };

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route
            exact
            path="/galleries"
            component={otherProps => <GalleryMain {...otherProps} />}
          />
          <Route
            exact
            path="/galleries/:galUser/:galName"
            component={props => this.getGallery(props)}
          />

          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/confirm/:key" component={ConfirmEmail} />
          <Route exact path="/user" component={UserContainer} />
          <Route exact path="/upload" component={Upload} />
          <Route exact path="/multi" component={UploadMultiImage} />
        </Switch>
      </div>
    );
  }
}

export default Routes;
