import React, {useState} from "react";
import Auth from '../../utils/auth';
import { useMutation, useQuery } from '@apollo/client';
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
  MDBInput
} from 'mdb-react-ui-kit';



export function Profile() {
    // var for useState and Mutations
    const [formState, setFormState] = useState({ email: '', password: '' });
    const { loading, data } = useQuery(QUERY_USER);
    const [updateUser] = useMutation(UPDATE_USER);
    const [addDog] = useMutation(ADD_DOG);
    const [updateDog] = useMutation(UPDATE_DOG);
   
    const userData = data?.user || {};

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
        console.log(mutationResponse)
        const token = mutationResponse.data.updateUser.token;
        Auth.getToken(token);
      } 
  





  const dynamicDogUpdate = async (event) => {
    event.preventDefault();

    if (formState.dogName === null || formState.dogName === undefined) {
      const mutationResponse = await addDog({
        variables: {
          dogName: formState.dogName,
          gender: formState.gender,
          breed: formState.breed,
          birthday: formState.birthday,
        },
      });
      const dogAdd = mutationResponse.data.addDog;
      console.log("Added Dog Successful!");
    } else {
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
      const dogUpdate = mutationResponse.data.updateDog;
      console.log("What the dog doing?");
    }
  };

    // if there is content filled out in the textbox for dog, then the button will be "update dog", otherwise, "add dog".
    // need to make id's 
    if (loading) {
      return <h2>LOADING...</h2>;
    }
   return (
    <section className="profile-wrapper">
      <div className="profile-cards">

      
      <MDBContainer >
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
                  {/* retrieve data for firstlast name  */}
                <p className="text-muted mb-1">{userData.firstName} {userData.lastName}</p> 
                <div className="d-flex justify-content-center mb-2">
                  <MDBBtn>Follow</MDBBtn>
                  <MDBBtn outline className="ms-1">Message</MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol> 
            {/* Owner info card */}
          <MDBCol lg="8" h="100" className="owner-card">
            <MDBCard className="mb-4">
            <form onSubmit={handleFormUserUpdate}>
              <MDBCardBody className="text-center">
                <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>First Name</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBInput name="firstName" label={userData.firstName} id='firstName' type='firstName' onInput={handleChange}/>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Last Name</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBInput name="lastName" label={userData.lastName} id='lastName' type='lastName' onInput={handleChange}/>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Email</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBInput name="email" label={userData.email} id='email' type='email' onInput={handleChange}/>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBBtn className="mb-4 w-100" type= "submit">Update user info</MDBBtn>
                </MDBCardBody>
              </form>
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
                  {/* retrieve data for dogName and dogBreed */}
                <p className="text-muted mb-1">Dog Name here later</p>
                <p className="text-muted mb-4">Dog Breed here later</p>
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
              <form onSubmit={dynamicDogUpdate}>
                <MDBCardBody className="text-center">
                <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Dog Name</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBInput name="dogName" label={userData.pet.dogName} id='dogName' type='dogName' onInput={handleChange}/>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Dog Gender</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBInput name="dogGender" label={userData.pet.dogGender} id='dogGender' type='dogGender' onInput={handleChange}/>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Dog Breed</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBInput name="dogBreed" label={userData.pet.dogBreed} id='dogBreed' type='dogBreed' onInput={handleChange}/>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Dog Age</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBInput name="dogAge" label={userData.pet.dogAge} id='dogAge' type='dogAge' onInput={handleChange}/>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBBtn className="mb-4 w-100" type= "submit">Update dog info</MDBBtn>
                </MDBCardBody>
              </form>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      </div>
    </section>
   );
}

export default Profile;