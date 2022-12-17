import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import "./CardFeed.css"

import { QUERY_USER } from '../../utils/queries';

import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBBtn,
  } from 'mdb-react-ui-kit';

export const CardFeed = () => {

  const { loading, data } = useQuery(QUERY_USER);
  const userData = data?.user || {};
return (
  <section className="card-feed-wrapper">
    <div className="profile-cards">
      <MDBContainer className="py-5 card-feed-container">
            {/* Owner image card */}
            <MDBCol lg="4">
              <MDBCard className="mb-4">
                <MDBCardBody className="text-center">
                  <MDBCardImage
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    alt="avatar"
                    className="rounded-circle"
                    style={{ width: '150px' }}
                    fluid />
                    {/* retrieve data for firstlast name  */}
                  <p className="text-muted mb-1">{userData.firstName} {userData.lastName}</p> 
                  
                </MDBCardBody>

                {/* Pet image card */}
                <MDBCardBody className="text-center">
                  <MDBCardImage
                    src="https://www.pngkit.com/png/full/950-9507730_635px-circle-dog-catches-something.png"
                    alt="avatar"
                    className="rounded-circle"
                    style={{ width: '150px' }}
                    fluid />
                    {/* retrieve data for dogName and dogBreed */}
                  <p className="text-muted mb-1">{userData.dogName}</p>
                  <p className="text-muted mb-4">{userData.birthday} Years Old</p>
                  <div className="d-flex justify-content-center mb-2">
                    <MDBBtn>Follow</MDBBtn>
                    <MDBBtn outline className="ms-1">Message</MDBBtn>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
      </MDBContainer>
    </div>
   </section> 
);  
};

export default CardFeed;