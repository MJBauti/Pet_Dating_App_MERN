import React from 'react';
import './CreatePost.css'
import { useMutation, useQuery } from '@apollo/client';
import { useForm } from "../../utils/submit-helper";
import { GET_ALL_POSTS } from '../../utils/queries';
import { CREATE_POST } from '../../utils/mutations';
import { QUERY_USER } from '../../utils/queries';
import Images from '../Images/Images';
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTextArea,
} from 'mdb-react-ui-kit';
import { valueFromASTUntyped } from 'graphql';


export const CreatePost = () => {
    // function to display user's data on posting.
    const { loading, data } = useQuery(QUERY_USER);
    const userData = data?.user || {};

    
    // Function to retrieve all users' posts.
    const { values, onChange, onSubmit } = useForm(createPostCallback, {
        body: "",
        email: userData.email,
    });
    values.email = userData.email;
    
    const [createPost, { error }] = useMutation(CREATE_POST, {
        
        variables: values,
        update(proxy, result) {
          const data = proxy.readQuery({
            query: GET_ALL_POSTS,
          });
          Object.getPosts = [result.data.createPost, ...data.getPosts];
          proxy.writeQuery({ query: GET_ALL_POSTS, data });
          values.body = ""
        },
    });

    // image handler
    const storedImages = []; 
        for(let i=0; i < 3; i++) {
            const storedImage = localStorage.getItem(`image${i}`);
            storedImages.push(storedImage);
    };

    // remove photos
    function refreshMyPhotos() {
       document.getElementById('deleteMe').textContent = ''
    }

    // function for images please fix me later gasssan 
    
    function createPostCallback() {
        createPost();
        window.location.reload();
    };

    if (loading) {
        return <h2>LOADING...</h2>;
    };
    
    console.log(storedImages);
    return (
        <form onSubmit={onSubmit}>
            <section>
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
                            {values.body ? values.body : "Share your thoughts!"}
                        </p>
                        </MDBCardBody>

                        {/* {ternuryImages} */}
                        <div id="deleteMe">
                        {storedImages.map((image, index) => {
                            return <img src={`${image}`} key={index} alt={`image${index} from local storage`} />
                        })}
                        </div>
                        

                        <MDBCardFooter
                        className="py-3 border-0"
                        style={{ backgroundColor: "#f8f9fa" }}
                        >
                        <div className="d-flex flex-start w-100">
                            <MDBTextArea label="Enter Something..."
                                name="body"
                                onChange={onChange}
                                value={values.body}
                                rows={4} style={{backgroundColor: '#fff'}} wrapperClass="w-100" />
                        </div>
                        <div className="float-end mt-2 pt-1">
                        
                          
                                
                           
                        
                            <MDBBtn size="sm" className="me-1" onClick={refreshMyPhotos}>Post!</MDBBtn>
                            <MDBBtn outline size="sm">Cancel</MDBBtn>
                        </div>
                        </MDBCardFooter>
                    </MDBCard>
                    </MDBCol>
                </MDBRow>
                </MDBContainer>
            </section>
        </form>
    
    );
}

  export default CreatePost;