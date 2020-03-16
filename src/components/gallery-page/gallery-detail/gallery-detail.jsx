import React, { Component } from "react";

import { connect } from "react-redux";
import { fetchGalleries, toggleCheck, check } from "../../../redux/gallery-main/gallery-main.action";

import "./gallery-detail.styles.scss";

import { Link, Redirect } from "react-router-dom";
import uuid from "uuid/v4";

class GalleryDetail extends Component {
  handle = () => {
    this.props.checkDispatch();
  };

  handleDownload = imageUrl => {
    const urlBase = `http://127.0.0.1:8000/api/download/`;
    let urlImage = `${imageUrl}`;
    return (
      <form action={urlBase} method="get">
        <input type="hidden" name="url" value={urlImage} />
        <button>download</button>
      </form>
    );
  };

  handleMultiDownload = list => {
    const urlBase = `http://127.0.0.1:8000/api/download-multiple/`;

    let urlsImageList = list.map(item => <input type="hidden" name="url" value={item.images} />);

    return (
      <form action={urlBase} method="get">
        {urlsImageList}
        <button>download multiple</button>
      </form>
    );
  };

  handleCheck = item => {
    this.props.toggleCheck(item);
  };

  getGallery = (title, user) => {
    let galObj = this.props.galleries;
    let idx = Object.keys(galObj).filter(el => galObj[el].title === title && galObj[el].user === user);
    return galObj[idx];
  };

  checkGallery = () => {
    let galleryObj = this.getGallery(this.props.title, this.props.user);
    let galObj = this.props.galleries;

    if (Object.keys(galObj).length !== 0) {
      let gallery = (
        <div className="gallery-detail">
          <h3>{galleryObj.title}</h3>
          {galleryObj.images.map((im, idx) => {
            let tmpIm;
            let im_s3 = galleryObj.images_s3.filter(img => img.unique_id === im.unique_id);

            if (im_s3.length > 0) {
              tmpIm = im_s3[0];
            } else {
              tmpIm = im;
            }
            return (
              <div key={tmpIm.unique_id}>
                <h3>{tmpIm.title}</h3>
                <img src={tmpIm.images} alt={tmpIm.title} />
                {this.handleDownload(tmpIm.images)}
                <input type="checkbox" onClick={() => this.handleCheck(tmpIm)} />
              </div>
            );
          })}
        </div>
      );

      return gallery;
    }
    return <Redirect to="/galleries" />;
  };

  render() {
    return (
      <div>
        {/* <button onClick={() => this.handleMultiDownload(this.props.list)}>
          Download Multi
        </button> */}
        <button onClick={this.handle}>Botton</button>
        {this.props.check ? this.handleMultiDownload(this.props.list) : "null"}
        {this.checkGallery()}
        <Link to="/">Back</Link>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchGalleries: galleries => dispatch(fetchGalleries(galleries)),
  toggleCheck: item => dispatch(toggleCheck(item)),
  checkDispatch: props => dispatch(check(props))
});

const mapStateToProps = state => ({
  galleries: state.galleries.galleries,
  list: state.galleries.listCheck,
  check: state.galleries.check
});

export default connect(mapStateToProps, mapDispatchToProps)(GalleryDetail);
