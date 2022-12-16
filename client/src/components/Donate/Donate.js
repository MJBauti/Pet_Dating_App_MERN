import { useState, useEffect } from "react";
import logo from '../../Assets/logo.png'
import './Donate.css';
import MainBody from '../MainBodyLayout/MainBody'
import { MDBBtn, MDBInput } from 'mdb-react-ui-kit';

// const [donate, setDonate] = useState('');

// const handleInputChange = (e) => {
//     const { target } = e;
//     const inputType = target.name;
//     const inputValue = target.value;

//     if (inputType === 'donate') {
//       setDonate(inputValue);
//     };
// };

const ProductDisplay = ({price}) => (
    <MainBody>
        <section>
        <div className="product">
            <img
            height="300px"
            width="300px"
            src={logo}
            alt="The cover of Stubborn Attachments"
            />
            <div className="description">
            <h3>Donate To The Doggos</h3>
            <form className="form">
                <label>Donate Here</label>

                {/* <input
                    defaultValue= {price}
                    name="price"
                    // onChange={handleInputChange}
                    type="text"
                    // placeholder="$10"
                /> */}
            </form>
            </div>
        </div>
        <form className="button" action="http://localhost:3001/create-checkout-session" method="POST">
            {/* <input type='hidden' name="price" value={price} /> */}
            <MDBInput
                    defaultValue= {price}
                    name="price"
                    // onChange={handleInputChange}
                    type="text"
                    // placeholder="$10"
                />
                <br />
            <MDBBtn type="submit">
            Pay Now
            </MDBBtn>
        </form>
        </section>
    </MainBody>
  );
  
  const Message = ({ message }) => (
    <section>
      <p>{message}</p>
    </section>
  );
  

export const Donate = () => {
        const [message, setMessage] = useState("");
        const [price, setPrice] = useState("")
      
        useEffect(() => {
          // Check to see if this is a redirect back from Checkout
          const query = new URLSearchParams(window.location.search);
      
          if (query.get("success")) {
            setMessage("Order placed! You will receive an email confirmation.");
          }
      
          if (query.get("canceled")) {
            setMessage(
              "Order canceled -- continue to shop around and checkout when you're ready."
            );
          }
        }, []);
      
        return message ? (
          <Message message={message} />
        ) : (
          <ProductDisplay price={price} />
        );
}

export default Donate;
