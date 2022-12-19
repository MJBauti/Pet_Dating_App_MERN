import React from "react";
import { useQuery } from '@apollo/client';
import "./PostCard.css";
import moment from "moment";
import { Link } from "react-router-dom";
import LikeButton from "../LikeButton/LikeButton";
// import DeleteButton from "../DeleteButton/DeleteButton";
import { QUERY_USER } from '../../utils/queries';

import {
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBBtn,
} from "mdb-react-ui-kit"
// import DeleteButton from "./DeleteButton";

// image handler
const storedImages = []; 
for(let i=0; i < 3; i++) {
    const storedImage = localStorage.getItem(`image${i}`);
    storedImages.push(storedImage);
};

// const ternuryImages = () => {
//     if (storedImages == null || undefined) {
//       return "";
//     } else {
//       return storedImages.map((image, index) => {
//         return <img src={`${image}`} key={index} alt={`image${index} from local storage`} />
//       });
//     }
// };

export function PostCard({ post }) {
    const { loading, data } = useQuery(QUERY_USER);
    const userData = data?.user || {};

    function goToPostId() {
        window.location.replace(`/posts/${post.id}`)
    };
    
    return (
        <MDBCard className="postCardWrapper">
            <MDBCardBody>
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px' }}
                  fluid />
                <h4 className="font-weight-bold mb-1">{post.email}</h4>
                <Link to={`/posts/${post.id}`}>
                    {moment(post.createdAt).fromNow(true)}
                </Link>
                
                <p>{post.body}</p>
                {storedImages.map((image, index) => {
                            if (image)
                            return <img className="uploaded" src={`${image}`} key={index}  />         
                })}
                <div className="likeButtonCSS">
                <LikeButton
                    className="like"
                    user={userData.firstName}
                    id={post.id}
                    body={post.body}
                    createdAt={post.createdAt}
                    email={post.email}
                    comments={post.comments}
                    likes={post.likes}
                    likeCount={post.likeCount}
                    commentCount={post.commentCount}
                />
                </div>
                <MDBBtn className='mx-2' color='tertiary' rippleColor='light' onClick={goToPostId}>
                {post.commentCount ? post.commentCount : "Comment"} 💬

                </MDBBtn>

                {/* <Popup content="comment">
                    <MDBBtn color="primary" size="sm" className="mr-1">
                        <MDBIcon icon="comments" className="mr-1" />
                        <MDBBadge className='ms-2'>{post.commentCount}</MDBBadge>
                    </MDBBtn>
                </Popup>
                {userData.email === post.email && (
                    <DeleteButton postId={post.id} />
                )} */}
            </MDBCardBody>
        </MDBCard>
    );
};

export default PostCard;