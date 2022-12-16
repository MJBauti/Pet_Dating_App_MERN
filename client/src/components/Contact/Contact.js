import { useState } from 'react';
import logoPng from '../../Assets/logo.png'
import MainBody from '../MainBodyLayout/MainBody'
import { validateEmail } from '../../utils/helpers';
import './Contact.css';
import { MDBBtn, MDBInput } from 'mdb-react-ui-kit';

export const Contact = () => {
    const description = `Our Doggos Will Get Back To You As Soon As Possible🐶`

    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (e) => {
        const { target } = e;
        const inputType = target.name;
        const inputValue = target.value;
    
        if (inputType === 'email') {
          setEmail(inputValue);
        } else if (inputType === 'userName') {
          setUserName(inputValue);
        } else {
          setMessage(inputValue);
        }
    };
    
    const handleFormSubmit = (e) => {
        e.preventDefault();
    
        if (!validateEmail(email) || !userName) {
          setErrorMessage('Email or Name is invalid');
          return;
        }
        setUserName('');
        setMessage('');
        setEmail('');
    };

    return (
        <MainBody>
            <section id="Contact">
                <main className="main" maxwidth="md">
                    <div className="about">
                    <div className="_img"
                        style={{ 
                            background: "url(" + logoPng + ")",
                            backgroundSize: 'contain',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            backgroundColor: 'skyblue',
                        }}
                    >
                    </div>
                        <div className="_content_wrapper">
                            <h1>
                                Hello {userName}! Contact US
                            </h1>
                            <h2>
                                {description}
                            </h2>
                        </div>
                    </div>
                    <form className="form">
                        <label>Your Email:</label>
                        <MDBInput
                            value={email}
                            name="email"
                            onChange={handleInputChange}
                            type="email"
                            placeholder="Email"
                        />
                        <label>Your Name:</label>
                        <MDBInput
                            value={userName}
                            name="userName"
                            onChange={handleInputChange}
                            type="text"
                            placeholder="Name"
                        />
                        <label>Message:</label>
                        <MDBInput
                            value={message}
                            name="message"
                            onChange={handleInputChange}
                            type="text"
                            placeholder="Message"
                        />
                        <MDBBtn type="button" onClick={handleFormSubmit}>Submit</MDBBtn>
                    </form>
                        <div>
                            <p className="error-text">{errorMessage}</p>
                        </div>
                </main>
            </section>
        </MainBody>
    );
};

export default Contact;