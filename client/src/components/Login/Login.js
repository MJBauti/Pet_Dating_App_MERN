import React, { useState } from 'react';
import Auth from '../../utils/auth';
import { useMutation } from '@apollo/client';
import { LOGIN } from "../../utils/mutations";
import { ADD_USER } from '../../utils/mutations';
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';

function Login(props) {

  const [justifyActive, setJustifyActive] = useState('tab1');;

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };


    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error }] = useMutation(LOGIN);
    const [addUser] = useMutation(ADD_USER);

    const handleFormLogin = async (event) => {
      event.preventDefault();
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
  const token = mutationResponse.data.addUser.token;
  Auth.login(token);
  };

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



          <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email' onChange={handleChange}/>
          <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' onChange={handleChange}/>

          <div className="d-flex justify-content-between mx-4 mb-4">
            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
          </div>

          <MDBBtn className="mb-4 w-100" onSubmit={handleFormLogin}>Sign in</MDBBtn>

        </MDBTabsPane>

        <MDBTabsPane show={justifyActive === 'tab2'}>

      

          <MDBInput wrapperClass='mb-4' name="firstName" label='First Name' id='form1' type='firstName' onChange={handleChange}/>
          <MDBInput wrapperClass='mb-4' name="lastName" label='Last Name' id='form1' type='lastName' onChange={handleChange}/>
          <MDBInput wrapperClass='mb-4' name="email" label='Email' id='form1' type='email' onChange={handleChange}/>
          <MDBInput wrapperClass='mb-4' name="password" label='Password' id='form1' type='password' onChange={handleChange}/>

          <div className='d-flex justify-content-center mb-4'>
            <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I have read and agree to the terms' />
          </div>

          <MDBBtn className="mb-4 w-100" onSubmit={handleFormSignup}>Sign up</MDBBtn>

        </MDBTabsPane>

      </MDBTabsContent>

    </MDBContainer>
  );

}
  
  export default Login;