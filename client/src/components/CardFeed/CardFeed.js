import React from "react";
import { useQuery } from "@apollo/client";
import "./CardFeed.css";
import PostCard from '../PostCard/PostCard';
import CreatePost from '../CreatePost/CreatePost';
import Images from '../Images/Images';

import { GET_SINGLE_POST } from '../../utils/queries';

import {
  MDBContainer,
  MDBCol,
  MDBRow,
} from 'mdb-react-ui-kit';

export const CardFeed = () => {
  const { loading, data } = useQuery(GET_SINGLE_POST);
  
  return (
    <MDBContainer className="card-feed-container">
    <h1 className="recent-posts"><strong>Recent Posts</strong></h1>
      <MDBRow className="page-title">
        
      </MDBRow>
      <MDBRow>
        {
          <MDBCol>

            <CreatePost/>
            
          </MDBCol>
        }
        <Images />
        {loading ? (
          <h1>Loading post...</h1>
        ) : (
          <MDBRow>
            {data.getPosts.map((post) => (
              <MDBCol key={post.id} style={{ marginBottom: 20 }}>
                <PostCard post={post} />
              </MDBCol>
            ))}
          </MDBRow>
        )}
      </MDBRow>
    </MDBContainer>
  );
};

export default CardFeed;