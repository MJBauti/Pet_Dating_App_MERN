import React, { useState } from 'react';
import Auth from '../../utils/auth';
import { useMutation } from '@apollo/client';
import { LOGIN } from "../../utils/mutations";
import { ADD_USER } from '../../utils/mutations';
import logoPng from '../../Assets/logo.png'
import './Login.css'

// MBD library for login ui
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBInput,
}
from 'mdb-react-ui-kit';

function Login(props) {

  const [justifyActive, setJustifyActive] = useState('tab1');;
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN);
  const [addUser] = useMutation(ADD_USER);

  // This is for the login/signup tabs
  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }
    setJustifyActive(value);
  };

  // This handles our login
  const handleFormLogin = async (event) => {
    event.preventDefault();
    console.log(formState.email)
    console.log(formState.password)
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };
  
  // This handles our signup
  const handleFormSignup = async (event) => {
    event.preventDefault();

    const mutationResponse = await addUser({
      variables: {
          email: formState.email,
          password: formState.password,
          firstName: formState.firstName,
          lastName: formState.lastName,
          dogName: formState.dogName,
          gender: formState.gender,
          breed: formState.breed,
          birthday: formState.birthday,
      },
    });
    console.log(error);
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  // This takes in the user's input
  const handleChange = (event) => {
  
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  

  return (
    <div className='wrapper'>
      <div className='company-intro'>
        <h1 className='company-name'> Pawfect Match </h1>
        <h2> Meet dog people for friends, pet playdates, or a date for you! </h2>
      </div> 
    <div className='login-wrapper'>
      <div className='picture-left'>
        <div className='_img' 
          style={{ 
            background: "url(" + logoPng + ")",
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundColor: 'skyblue',
          }}>
          <h1> Meet new friends! </h1>
        </div>
        
      </div>

      <div className='login-right'>
        <MDBContainer className="w-50">
          <h1 className='joinus'>  &nbsp;&nbsp;Sign up today!&nbsp;&nbsp;</h1>
          <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
            <MDBTabsItem>
              <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
                Register
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
                Login
              </MDBTabsLink>
            </MDBTabsItem>
          </MDBTabs>

          <MDBTabsContent>
            <MDBTabsPane show={justifyActive === 'tab1'}>
              <form onSubmit={handleFormSignup}>
                <MDBInput wrapperClass='mb-4' name="firstName" label='First Name' id='firstName' type='firstName' onInput={handleChange}/>
                <MDBInput wrapperClass='mb-4' name="lastName" label='Last Name' id='lastName' type='lastName' onInput={handleChange}/>
                <MDBInput wrapperClass='mb-4' name="email" label='Email' id='email' type='email' onInput={handleChange}/>
                <MDBInput wrapperClass='mb-4' name="password" label='Password' id='password' type='password' onInput={handleChange}/>
                <MDBInput wrapperClass='mb-4' name="dogName" label='Dog Name' id='dogName' type='dogName' onInput={handleChange}/>
                <MDBInput wrapperClass='mb-4' name="gender" label='Gender' id='gender' type='gender' onInput={handleChange}/>
                <MDBInput wrapperClass='mb-4' name="breed" label='Breed' id='breed' type='breed' onInput={handleChange}/>
                <MDBInput wrapperClass='mb-4' name="birthday" label='Age' id='birthday' type='birthday' onInput={handleChange}/>
                <MDBBtn className="mb-4 w-100" type= "submit">Sign up</MDBBtn>
              </form>
            </MDBTabsPane>

            <MDBTabsPane show={justifyActive === 'tab2'}>
              <form onSubmit={handleFormLogin}>
                <MDBInput wrapperClass='mb-4' name="email" label='Email address' id='email' type='email' onInput={handleChange}/>
                <MDBInput wrapperClass='mb-4' name="password" label='Password' id='password' type='password' onInput={handleChange}/>
                <MDBBtn className="mb-4 w-100" type= "submit">Sign in</MDBBtn>
              </form>
            </MDBTabsPane>
          </MDBTabsContent>
        </MDBContainer>
      </div>
    </div>

    </div>
  );

}
  
  export default Login;