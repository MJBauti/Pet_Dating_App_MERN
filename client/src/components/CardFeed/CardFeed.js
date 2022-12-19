import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import "./CardFeed.css";
import PostCard from '../PostCard/PostCard';
import CreatePost from '../CreatePost/CreatePost';

import { GET_SINGLE_POST } from '../../utils/queries';

import {
  MDBContainer,
  MDBCol,
  MDBRow,
} from 'mdb-react-ui-kit';

export const CardFeed = () => {
  const { loading, data } = useQuery(GET_SINGLE_POST);
  
  return (
    <MDBContainer>
      <MDBRow className="page-title">
        <h1>Recent Posts</h1>
      </MDBRow>
      <MDBRow>
        {
          <MDBCol>
            <CreatePost />
          </MDBCol>
        }
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