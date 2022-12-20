import React, { useState, useEffect, useRef } from 'react';
import './Posts.css'
import { useMutation, useQuery, gql } from '@apollo/client';
import moment from "moment";
import { ADD_COMMENT } from '../../utils/mutations';
// import { LIKE_POST } from '../../utils/mutations';
// import { DELETE_COMMENT } from '../../utils/mutations';
// import { DELETE_POST } from '../../utils/mutations';

import {
  MDBBtn,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBCardFooter,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBBadge,
  MDBInput
} from 'mdb-react-ui-kit';

// import DeleteButton from '../DeleteButton/DeleteButton';
import LikeButton from '../LikeButton/LikeButton';
// import Popup from '../../utils/Popup';

export function Posts(props) {
  const [speed, setSpeed] = useState("");
  const [comment, setComment] = useState("");
  // const commentInputRef = useRef(null);
  
  const url = window.location.pathname;
  const postId = url.split('/')[2];
  const { data } = useQuery(GET_ALL_POSTS, {
    variables: {
      postId,
    },
  });
  const postData = data?.getPost || {};
  console.log(postData.body)
  const [submitComment] = useMutation(ADD_COMMENT, {
    update() {
      setComment("");
    },
    variables: {
      postId,
      body: comment,
    },
  });

  function deletePostCallback() {
    props.history.push("/");
  }
  
  useEffect(() => {
    setSpeed(Math.floor(Math.random() * 5000));
  }, []);

  const {
    id,
    body,
    createdAt,
    email,
    comments,
    likes,
    likeCount,
    commentCount,
  } = postData

  return (
    <MDBContainer className='postWrapper'>
      <MDBRow className='rowPost'>
        <MDBCol >
          
        </MDBCol>
        <MDBCol >
          <MDBCard>
            <MDBCardBody>
            <MDBCardImage
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
            alt="avatar"
            className="rounded-circle"
            style={{ width: '150px' }}
            fluid />
             
              
              <MDBCardFooter></MDBCardFooter>
            </MDBCardBody>
            <MDBCardBody>
            <LikeButton 
                id={id}
                body={body}
                createdAt={createdAt}
                email={email}
                comments={comments}
                likes={likes}
                likeCount={likeCount}
                commentCount={commentCount}
              />
            <MDBCardHeader>{postData.body} {moment(postData.createdAt).fromNow()} </MDBCardHeader>
              
            

              
            </MDBCardBody>
          </MDBCard>
          {
            <MDBCard className='commentCard'>
              <MDBCardBody>
                <p>Post a comment</p>
                <MDBBadge className='ms-2'>{postData.commentCount ? postData.commentCount : "Be the first to comment!"}</MDBBadge>
                <MDBInput onChange={(event) => setComment(event.target.value)}></MDBInput>
                
                <MDBBtn
                      type="submit"
                      className=" button "
                      disabled={comment.trim() === ""}
                      onClick={submitComment}
                    >
                      Submit
                    </MDBBtn>
                    
              </MDBCardBody>
            </MDBCard>
          }
          {postData.email===null && (postData.comments.map((comment) => (
            <MDBCard fluid key={comment.id}>
              <MDBCardBody>
                
                <MDBCardHeader>{comment.email}</MDBCardHeader>
                <MDBCardFooter>{moment(comment.createdAt).fromNow()}</MDBCardFooter>
                <div>{comment.body}</div>
              </MDBCardBody>
            </MDBCard>
          )))}
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};


// const QUERY_USER = gql`
//   {
//     user {
//       _id
//       firstName
//       lastName
//       email
//       dogName
//       gender
//       breed
//       birthday
      
//     }
//   }
// `;

export const GET_ALL_POSTS = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      email
      likeCount
      likes {
        email
      }
      commentCount
      comments {
        id
        email
        createdAt
        body
      }
    }
  }
`;

export default Posts;



