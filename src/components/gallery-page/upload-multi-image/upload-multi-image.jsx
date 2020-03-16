import React, { Component } from "react";

import { connect } from "react-redux";
import { uploadGalleryImages } from "../../../redux/gallery-main/gallery-main.action";
import { isLoading } from "../../../redux/gallery-main/gallery-main.action";

import axios from "axios";

class UploadMultiImage extends Component {
  handleImageUploadMulti = event => {
    let images = event.target.files;
    this.props.uploadGalleryImages(images);
  };

  handleSubmit = async event => {
    event.preventDefault();
    const url = `http://127.0.0.1:8000/api/route/`;
    // let form_data = new FormData();
    let title = this.refs.title.value;
    let images = Array.from(this.props.images);

    images.forEach((item, idx) => {
      let form_data = new FormData();
      form_data.append("title", title);
      form_data.append(`images[${idx}]title`, item.name);
      form_data.append(`images[${idx}]images`, item);
      let config = {
        onUploadProgress: progressEvent => {
          let percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          console.log(percentCompleted);
        }
      };
      this.props.isLoadingAction();
      axios
        .post(url, form_data, config)
        .then(response => {
          console.log(response);
        })
        .then(res => {
          this.props.isLoadingAction();
        })
        .catch(error => console.log(error.response));
    });
  };

  render() {
    let inputField = (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="title">title of gallery</label>
        <input id="title" type="text" ref="title" />

        <label htmlFor="images">images</label>
        <input
          id="images"
          type="file"
          ref="images"
          accept="image/png, image/jpeg"
          onChange={this.handleImageUploadMulti}
          multiple
        />

        <button>Submit</button>
      </form>
    );
    return (
      <div>
        <div className="form">{inputField}</div>
        {this.props.isLoading ? <h2>is Uploading...</h2> : null}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  uploadGalleryImages: props => dispatch(uploadGalleryImages(props)),
  isLoadingAction: props => dispatch(isLoading(props))
});

const mapStateToProps = state => ({
  images: state.galleries.images,
  isLoading: state.galleries.isLoading
});

export default connect(mapStateToProps, mapDispatchToProps)(UploadMultiImage);
