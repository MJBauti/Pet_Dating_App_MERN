import React, {useState} from "react";
import Auth from '../../utils/auth';
import { useMutation } from '@apollo/client';
import "./Profile.css"

// queries
import { QUERY_USER } from '../../utils/queries';

// mutations
import { UPDATE_USER } from '../../utils/mutations';
import { UPDATE_DOG } from '../../utils/mutations';
import { ADD_DOG } from '../../utils/mutations';


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




export function Profile() {
    // var for useState and Mutations
    const [formState, setFormState] = useState({ email: '', password: '' });
   //  const [displayInfo] = useMutation(QUERY_USER);
    const [updateUser] = useMutation(UPDATE_USER);
    const [addDog] = useMutation(ADD_DOG);
    const [updateDog] = useMutation(UPDATE_DOG);
   
    // Detects user's inputs
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };
   
   // function for populating the cards with existing data
   // please make me
   
    // function for handling updateUser
    const handleFormUserUpdate = async (event) => {
        event.preventDefault();
    
        const mutationResponse = await updateUser({
          variables: {
              email: formState.email,
              firstName: formState.firstName,
              lastName: formState.lastName,
          },
        });
        console.log("Updated User Successful!");
    };
   
    // function for handling addDog
    const handleFormAddDog = async (event) => {
        event.preventDefault();
    
        const mutationResponse = await addDog({
          variables: {
            dogName: formState.dogName,
            profilePicture: formState.profilePicture,
            pictures: formState.pictures,
            gender: formState.gender,
            breed: formState.breed,
            birthday: formState.birthday,
          },
        });
        console.log("Added Dog Successful!");
    };
    // function for handling updateDog
    const handleFormUpdateDog = async (event) => {
        event.preventDefault();
    
        const mutationResponse = await updateDog({
          variables: {
            dogName: formState.dogName,
            profilePicture: formState.profilePicture,
            pictures: formState.pictures,
            gender: formState.gender,
            breed: formState.breed,
            birthday: formState.birthday,
          },
        });
        console.log("What the dog doing?");
    };
   
   
   
   
    // if there is content filled out in the textbox for dog, then the button will be "update dog", otherwise, "add dog".
    // need to make id's 
   return (
    <section className="wrapper">
      <div className="profile-cards">

      
      <MDBContainer className="py-5">
        <MDBRow>
          
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
                <p className="text-muted mb-1">Full Stack Developer</p>
                <p className="text-muted mb-4">Bay Area, San Francisco, CA</p>
                <div className="d-flex justify-content-center mb-2">
                  <MDBBtn>Follow</MDBBtn>
                  <MDBBtn outline className="ms-1">Message</MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
            {/* Owner info card */}
          <MDBCol lg="8" h="100">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">Johnatan Smith</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">example@example.com</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Phone</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">(097) 234-5678</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <MDBContainer className="py-5">
        <MDBRow>
          
          {/* Dog image card */}
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src="https://www.pngkit.com/png/full/950-9507730_635px-circle-dog-catches-something.png"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px' }}
                  fluid />
                <p className="text-muted mb-1">Full Stack Developer</p>
                <p className="text-muted mb-4">Bay Area, San Francisco, CA</p>
                <div className="d-flex justify-content-center mb-2">
                  <MDBBtn>Follow</MDBBtn>
                  <MDBBtn outline className="ms-1">Message</MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          
            {/* Dog info card */}
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">Johnatan Smith</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">example@example.com</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Phone</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">(097) 234-5678</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Mobile</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">(098) 765-4321</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Address</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">Bay Area, San Francisco, CA</MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      </div>
    </section>
   );
}

export default Profile;