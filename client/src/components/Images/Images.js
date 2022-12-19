import React from 'react';
import ImageUploading from 'react-images-uploading';
import './Images.css';
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardImage,
  }
  from 'mdb-react-ui-kit';

export function Images() {
  const [images, setImages] = React.useState([]);
  const maxNumber = 69;

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  return (
    <MDBCard className="Images">
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            &nbsp;
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <MDBCardImage src={image['data_url']} alt="" width="200px" />

                <div className="image-item__btn-wrapper">
                  <MDBBtn className="update" onClick={() => onImageUpdate(index)}>Update</MDBBtn>
                  <MDBBtn className="remove" onClick={() => onImageRemove(index)}>Remove</MDBBtn>
                </div>
              </div>
            ))}
            <MDBCardTitle>Pupper</MDBCardTitle>
            <MDBBtn
              style={isDragging ? { color: 'red' } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or Drop here
            </MDBBtn>
            <MDBBtn className="rem-butt" onClick={onImageRemoveAll}>Remove all images</MDBBtn>
          </div>
        )}
      </ImageUploading>
    </MDBCard>
  );
}

export default Images;