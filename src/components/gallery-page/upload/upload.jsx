import React, { Component } from "react";

import "./upload.styles.scss";

import { connect } from "react-redux";
import { upload_gallery } from "../../../redux/gallery-main/gallery-main.action";
import { upload_image } from "../../../redux/gallery-main/gallery-main.action";

import axios from "axios";

class Upload extends Component {
  handleImageUpload = event => {
    let image_gallery = event.target.files[0];
    this.props.upload_image(image_gallery);
  };

  handleSubmit = async event => {
    console.log(this.props.image);
    event.preventDefault();
    let title = this.refs.title.value;
    let description = this.refs.description.value;
    let location = this.refs.location.value;
    let city = this.refs.city.value;
    let type_photography = this.refs.type_photography.value;
    let is_copyright = this.refs.is_copyright.value;
    let is_paid = this.refs.is_paid.value;
    let user = this.refs.user.value;

    await this.props.upload_gallery(
      title,
      description,
      location,
      city,
      type_photography,
      is_copyright,
      is_paid,
      user
    );

    const url = `http://127.0.0.1:8000/api/list-gallery/`;
    // const url = `http://127.0.0.1:8000/api/test/`;

    let form_data = new FormData();

    form_data.append("title", this.props.upload.title);
    if (this.props.image !== undefined) {
      form_data.append(
        "image_gallery",
        this.props.image,
        this.props.image.name
      );
    }
    form_data.append("description", this.props.upload.description);
    form_data.append("location", this.props.upload.location);
    form_data.append("city", this.props.upload.city);
    form_data.append("type_photography", this.props.upload.type_photography);
    form_data.append("is_copyright", this.props.upload.is_copyright);
    form_data.append("type_photography", this.props.upload.type_photography);
    form_data.append("is_paid", this.props.upload.is_paid);
    form_data.append("user", this.props.upload.user);

    axios
      .post(url, form_data, {
        // headers: {
        //   "content-type": "multipart/form-data"
        // }
      })
      .then(response => console.log(response))
      .catch(error => console.log(error.response));
  };
  render() {
    let inputField = (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="title">title</label>
        <input id="title" type="text" ref="title" />

        <label htmlFor="image_gallery">image_gallery</label>
        <input
          id="image_gallery"
          type="file"
          ref="image_gallery"
          accept="image/png, image/jpeg"
          onChange={this.handleImageUpload}
        />

        <label htmlFor="description">description</label>
        <input id="description" type="text" ref="description" />

        <label htmlFor="location">location</label>
        <input id="location" type="text" ref="location" />

        <label htmlFor="city">city</label>
        <input id="city" type="text" ref="city" />

        <label htmlFor="type_photography">type_photography</label>
        <input id="type_photography" type="text" ref="type_photography" />

        <label htmlFor="is_copyright">is_copyright</label>
        <input id="is_copyright" type="text" ref="is_copyright" />

        <label htmlFor="is_paid">is_paid</label>
        <input id="is_paid" type="checkbox" ref="is_paid" />

        <label htmlFor="user">user</label>
        <input id="user" type="number" ref="user" />

        <button>Submit</button>
      </form>
    );
    return <div className="form">{inputField}</div>;
  }
}

const mapStateToProps = state => ({
  galleries: state.galleries.galleries,
  upload: state.galleries.upload,
  image: state.galleries.image
});

const mapDispatchToProps = dispatch => ({
  upload_gallery: (...props) => dispatch(upload_gallery(...props)),
  upload_image: image => dispatch(upload_image(image))
});

export default connect(mapStateToProps, mapDispatchToProps)(Upload);
