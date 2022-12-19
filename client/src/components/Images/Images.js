import React from 'react';
import ImageUploading from 'react-images-uploading';
import './Images.css';
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardImage,
    MDBContainer,
  }
  from 'mdb-react-ui-kit';

export const Images = () => {
  const [images, setImages] = React.useState([]);
  const maxNumber = 69;
//   const image = this.getImage.value;
//   localStorage.setItem('image', image );

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);

    imageList.forEach((image, index) => {
      var i=0;
      index = i++;
      localStorage.setItem(`image${index}`, image['data_url']);
      const storedImages = []; 
      for(let i=0; i < storedImages; i++) {
        const storedImage = localStorage.getItem(`image${i}`);
        storedImages.push(storedImage);
      };
    });
  };

  function addPhoto() {
    
  }
  return (
    <MDBContainer className="ImagesWrapper">
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
                  <MDBBtn onClick={addPhoto}>Upload</MDBBtn>
                </div>
              </div>
            ))}
            {/* <MDBCardTitle>Pupper</MDBCardTitle> */}
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
    </MDBContainer>
  );
}

export default Images;