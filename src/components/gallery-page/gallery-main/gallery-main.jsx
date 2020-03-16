import React, { Component } from "react";

import { connect } from "react-redux";
import { fetchGalleries } from "../../../redux/gallery-main/gallery-main.action";

import "./gallery-main.styles.scss";

import { Link } from "react-router-dom";

import axios from "axios";
import uuid from "uuid/v4";

class GalleryMain extends Component {
  componentDidMount() {
    this.startFetch();
  }

  startFetch = () => {
    let galObj = this.props.galleries;
    if (Object.keys(galObj).length === 0) {
      axios
        .get(`http://127.0.0.1:8000/api/route`)
        .then(res => this.props.fetchGalleries(res.data));
    }
  };

  handleDownload = (imageUrl, title) => {
    const urlBase = `http://127.0.0.1:8000/api/download/`;
    let urlImage = `${imageUrl}`;
    return (
      <form action={urlBase} method="get">
        <input type="hidden" name="url" value={urlImage} />
        <button>download</button>
      </form>
    );
  };

  render() {
    let galObj = this.props.galleries;

    const galleries_main = Object.keys(galObj).map(el => {
      let urlToGallery = `/galleries/${galObj[el].user}/${galObj[el].title}`;
      return (
        <div className="gallery-main" key={uuid()}>
          <h3>
            <Link to={urlToGallery}>{galObj[el].title}</Link>
          </h3>
          <Link to={urlToGallery}>
            <img src={galObj[el].image_gallery} alt={galObj[el].title} />
          </Link>
          {this.handleDownload(galObj[el].image_gallery)}
        </div>
      );
    });

    return (
      <div>
        <div>{galleries_main}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  galleries: state.galleries.galleries
});

const mapDispatchToProps = dispatch => ({
  fetchGalleries: galleries => dispatch(fetchGalleries(galleries))
});

export default connect(mapStateToProps, mapDispatchToProps)(GalleryMain);
