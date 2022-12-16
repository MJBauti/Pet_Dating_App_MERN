import React, { useState } from 'react';
import Auth from '../../utils/auth';
import { useMutation } from '@apollo/client';
import { LOGIN } from "../../utils/mutations";
import { ADD_USER } from '../../utils/mutations';
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
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">

      <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
            Login
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
            Register
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>

        <MDBTabsPane show={justifyActive === 'tab1'}>


        <form onSubmit={handleFormLogin}>
          <MDBInput wrapperClass='mb-4' name="email" label='Email address' id='email' type='email' onInput={handleChange}/>
          <MDBInput wrapperClass='mb-4' name="password" label='Password' id='password' type='password' onInput={handleChange}/>

          <MDBBtn className="mb-4 w-100" type= "submit">Sign in</MDBBtn>
        </form>
        </MDBTabsPane>

        <MDBTabsPane show={justifyActive === 'tab2'}>

      
          <form onSubmit={handleFormSignup}>
          <MDBInput wrapperClass='mb-4' name="firstName" label='First Name' id='firstName' type='firstName' onInput={handleChange}/>
          <MDBInput wrapperClass='mb-4' name="lastName" label='Last Name' id='lastName' type='lastName' onInput={handleChange}/>
          <MDBInput wrapperClass='mb-4' name="email" label='Email' id='email' type='email' onInput={handleChange}/>
          <MDBInput wrapperClass='mb-4' name="password" label='Password' id='password' type='password' onInput={handleChange}/>

          <MDBBtn className="mb-4 w-100" type= "submit">Sign up</MDBBtn>
          </form>
        </MDBTabsPane>

      </MDBTabsContent>

    </MDBContainer>
  );

}
  
  export default Login;