import React, {useState} from "react";
import Auth from '../../utils/auth';
import { useMutation, useQuery } from '@apollo/client';
import "./Profile.css"

// queries
import { QUERY_USER } from '../../utils/queries';
// mutations
import { UPDATE_USER } from '../../utils/mutations';



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
    const [formState, setFormState] = useState({ email: '', firstName: '', lastName: '', dogName: '', gender: '', breed: '', birthday: '', });
    const { loading, data } = useQuery(QUERY_USER);

    const [updateUser] = useMutation(UPDATE_USER);
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

     
      const inputFirstName = formState.firstName || userData.firstName;
      const inputLastName = formState.lastName || userData.lastName;
      const inputEmail = formState.email || userData.email;
      const inputDogName = formState.dogName || userData.dogName;
      const inputBreed = formState.breed || userData.breed;
      const inputGender = formState.gender || userData.gender;
      const inputBirthday = formState.birthday || userData.birthday;
      console.log (inputFirstName)
      console.log (inputLastName)
      console.log (inputEmail)
      console.log (inputDogName)
      console.log (inputBreed)
      console.log (inputGender)
      console.log (inputBirthday)
        const mutationResponse = await updateUser({
          variables: {
            firstName: inputFirstName,
            lastName: inputLastName,
            email: inputEmail,
            dogName: inputDogName,
            breed: inputBreed,
            gender: inputGender,
            birthday: inputBirthday
        },
        });
        window.location.replace('./profile')
      } 
  
    // if there is content filled out in the textbox for dog, then the button will be "update dog", otherwise, "add dog".
    // need to make id's 
    if (loading) {
      return <h2>LOADING...</h2>;
    }
   return (
    <section className="profile-wrapper">
      <div className="profile-cards">

      <form onSubmit={handleFormUserUpdate}>
      <MDBContainer >
        <MDBRow>
          {/* Owner image card */}
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center owner-image-card">
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
            
          <MDBCol lg="8" h="100" className="owner-card ">
            <MDBCard className="mb-4">
            
              <MDBCardBody className="text-center ">
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
              
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <MDBContainer className="py-5">
        <MDBRow>
          
          {/* Dog image card */}
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center dog-image-card">
                <MDBCardImage
                  src="https://www.pngkit.com/png/full/950-9507730_635px-circle-dog-catches-something.png"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px' }}
                  fluid />
                  {/* retrieve data for dogName and dogBreed */}
                <p className="text-muted mb-1">{userData.dogName}, {userData.birthday}</p>
                <p className="text-muted mb-4">{userData.gender} {userData.breed}</p>
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
              
                <MDBCardBody className="text-center card-input">
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Dog Name</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBInput name="dogName" label={userData.dogName} id='dogName' type='dogName' onInput={handleChange}/>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Dog Gender</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBInput name="gender" label={userData.gender} id='gender' type='gender' onInput={handleChange}/>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Dog Breed</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBInput name="breed" label={userData.breed} id='dogbreed' type='breed' onInput={handleChange}/>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Dog Age</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBInput name="birthday" label={userData.birthday} id='birthday' type='birthday' onInput={handleChange}/>
                    </MDBCol>
                  </MDBRow>

                  <hr />
                  <MDBBtn className="mb-4 w-100" type= "submit">Update dog info</MDBBtn>
                </MDBCardBody>
             
            </MDBCard>
          </MDBCol>
          
        </MDBRow>
      </MDBContainer>
      </form>
      </div>
    </section>
   );
}

export default Profile;