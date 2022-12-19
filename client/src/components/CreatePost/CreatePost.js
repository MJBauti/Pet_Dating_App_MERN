import React, { useState }  from 'react';
import './CreatePost.css'
import { useMutation, useQuery } from '@apollo/client';
import { useForm } from "../../utils/submit-helper";
import { GET_ALL_POSTS } from '../../utils/queries';
import { CREATE_POST } from '../../utils/mutations';
import { QUERY_USER } from '../../utils/queries';
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBTextArea,
  MDBInput
} from 'mdb-react-ui-kit';


export const CreatePost = () => {
    // function to display user's data on posting.
    const { loading, data } = useQuery(QUERY_USER);
    const userData = data?.user || {};
    const [images, setImages] = React.useState([]);
    const [createPost] = useMutation(CREATE_POST);
    const [showImages, setShowImages] = React.useState(true);
    const [formState, setFormState] = useState({ body: '', email: '' });
    
    // Function to retrieve all users' inputs.
    // const { values, onChange, onSubmit } = useForm(createPostCallback, {
    //     body: "",
        
    // });
    
    // const [createPost, { error }] = useMutation(CREATE_POST, {
        
    //     variables: {
    //         values,
    //     },
    //     update(proxy, result) {
    //       const data = proxy.readQuery({
    //         query: GET_ALL_POSTS,
    //       });
    //       Object.getPosts = [result.data.createPost, ...data.getPosts];
    //       proxy.writeQuery({ query: GET_ALL_POSTS, data });
    //       values.body = ""
          
    //     },
    // });

    // create post handler 
    const handleFormCreatePost = async (event) => {
        event.preventDefault();
    
        const mutationResponse = await createPost({
          variables: {
              email: userData.email,
              body: formState.body,
          },
          
        });
        window.location.reload();
    };

    // image handler
    const storedImages = []; 
    if(storedImages == null || undefined) {
        return
    } else {
        for(let i=0; i < 3; i++) {
            const storedImage = localStorage.getItem(`image${i}`);
            storedImages.push(storedImage);
    }};


    // remove photos
    function refreshMyPhotos() {
       document.getElementById('deleteMe').textContent = ''
    }

    // This takes in the user's input
    const handleChange = (event) => {
    
        const { name, value } = event.target;
        setFormState({
        ...formState,
        [name]: value,
        });
    };
    
    // function createPostCallback() {
    //     createPost();
    // };

    if (loading) {
        return <h2>LOADING...</h2>;
    };
    
    return (
        <form onSubmit={handleFormCreatePost}>
                <MDBContainer className="py-5" style={{ maxWidth: "1000px" }}>
                <MDBRow className="justify-content-center">
                    <MDBCol md="12" lg="10" xl="8">
                    <MDBCard>
                        <MDBCardBody>
                        <div className="d-flex flex-start align-items-center">
                            <MDBCardImage
                            className="rounded-circle shadow-1-strong me-3"
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                            alt="avatar"
                            width="60"
                            height="60"
                            />
                            <div>
                            <h6 className="fw-bold text-primary mb-1">{userData.firstName} {userData.lastName}</h6>
                            </div>
                        </div>
                        <p className="mt-3 mb-4 pb-2">
                            "Share your thoughts!"
                        </p>
                        </MDBCardBody>

                        {/* {ternuryImages} */}
                        <div className="img-up" id="deleteMe">
                        {storedImages.map((image, index) => {
                            if (image === images)
                            return <img src={`${image}`} key={index} alt="puppy" />
                            else {
                                return("")
                            }
                        })}
                        </div>
                        

                        <MDBCardFooter
                        className="py-3 border-0"
                        style={{ backgroundColor: "#f8f9fa" }}
                        >
                        <MDBCol className="d-flex flex-start w-100">
                            <MDBInput label="Enter Something..."
                                name="body"
                                type='firstName'

                                id="body"
                                onInput={handleChange}

                                rows={4} style={{backgroundColor: '#fff'}} wrapperClass="w-100" />
                        </MDBCol>
                        <div className="float-end mt-2 pt-1">
                        
                          
                                
                           
                        
                            <MDBBtn size="sm" className="me-1" onClick={refreshMyPhotos}>Post!</MDBBtn>
                            <MDBBtn outline size="sm">Cancel</MDBBtn>
                        </div>
                        </MDBCardFooter>
                    </MDBCard>
                    </MDBCol>
                </MDBRow>
                </MDBContainer>
        </form>
    
    );
}

  export default CreatePost;