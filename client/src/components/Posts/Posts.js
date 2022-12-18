import React, { useState, useEffect, useContext, useRef } from 'react';
import './Posts.css'
import { useMutation, useQuery } from '@apollo/client';
import {useMatch} from 'react-router-dom';
import moment from "moment";

import { GET_SINGLE_POST } from '../../utils/queries';
import { ADD_COMMENT } from '../../utils/mutations';
import { LIKE_POST } from '../../utils/mutations';
import { DELETE_COMMENT } from '../../utils/mutations';
import { DELETE_POST } from '../../utils/mutations';


import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTextArea,
} from 'mdb-react-ui-kit';

export function Posts(props) {

    // Mutations and queries 
    const [comment, setComment] = useState("");

    const postId = window.location.pathname;
    console.log(postId);

    const {data} = useQuery(GET_SINGLE_POST, {
        variables: {
            postId,
        },
    });
    

    const [addComment] = useMutation(ADD_COMMENT, {
        update() {
            setComment("");
        },
        variables: {
            postId,
            body: comment,
        },
    });

    function deletePostButton() {
        props.history.push("/");
    }

    let postMarkup;
    if (!data) {
      postMarkup = <p>Loading Post...</p>;
    } else {
      const {
        id,
        body,
        createdAt,
        email,
        comments,
        likes,
        likeCount,
        commentCount,
      } = data;
    }

    return (
        <section className="vh-100" style={{ backgroundColor: "#eee" }}>
        <MDBContainer className="py-5" style={{ maxWidth: "1000px" }}>
          <MDBRow className="justify-content-center">
            <MDBCol md="12" lg="10" xl="8">
              <MDBCard>
                <MDBCardBody>
                  <div className="d-flex flex-start align-items-center">
                    <MDBCardImage
                      className="rounded-circle shadow-1-strong me-3"
                      src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(19).webp"
                      alt="avatar"
                      width="60"
                      height="60"
                    />
                    <div>
                      <h6 className="fw-bold text-primary mb-1">Lily Coleman</h6>
                      <p className="text-muted small mb-0">
                        Shared publicly - Jan 2020
                      </p>
                    </div>
                  </div>

                  <p className="mt-3 mb-4 pb-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip consequat.
                  </p>

                  <div className="small d-flex justify-content-start">
                    <a href="#!" className="d-flex align-items-center me-3">
                      <MDBIcon far icon="thumbs-up me-2" />
                      <p className="mb-0">Like</p>
                    </a>
                    <a href="#!" className="d-flex align-items-center me-3">
                      <MDBIcon far icon="comment-dots me-2" />
                      <p className="mb-0">Comment</p>
                    </a>
                    <a href="#!" className="d-flex align-items-center me-3">
                      <MDBIcon fas icon="share me-2" />
                      <p className="mb-0">Share</p>
                    </a>
                  </div>
                </MDBCardBody>

                <MDBCardFooter
                  className="py-3 border-0"
                  style={{ backgroundColor: "#f8f9fa" }}
                >
                  <div className="d-flex flex-start w-100">
                    <MDBCardImage
                      className="rounded-circle shadow-1-strong me-3"
                      src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(19).webp"
                      alt="avatar"
                      width="40"
                      height="40"
                    />
                    <MDBTextArea label='Message' id='textAreaExample' rows={4} style={{backgroundColor: '#fff'}} wrapperClass="w-100" />
                  </div>
                  <div className="float-end mt-2 pt-1">
                    <MDBBtn size="sm" className="me-1">Post comment</MDBBtn>
                    <MDBBtn outline size="sm">Cancel</MDBBtn>
                  </div>
                </MDBCardFooter>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    );
}

  export default Posts;

  



