import React from 'react';
import './CreatePost.css'
import { useMutation, useQuery } from '@apollo/client';
import { useForm } from "../../utils/submit-helper";
import { GET_ALL_POSTS } from '../../utils/queries';
import { CREATE_POST } from '../../utils/mutations';
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


export const CreatePost = () => {
    const { values, onChange, onSubmit } = useForm(createPostCallback, {
        body: "",
    });
    const [createPost, { error }] = useMutation(CREATE_POST, {
        
        variables: values,
        update(proxy, result) {
          const data = proxy.readQuery({
            query: GET_ALL_POSTS,
          });
          Object.getPosts = [result.data.createPost, ...data.getPosts];
          proxy.writeQuery({ query: GET_ALL_POSTS, data });
          values.body = "";
        },
    });

    function createPostCallback() {
        createPost();
    }

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
                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(19).webp"
                            alt="avatar"
                            width="60"
                            height="60"
                            />
                            <div>
                            <h6 className="fw-bold text-primary mb-1">Lily Coleman</h6>
                            </div>
                        </div>
                        <p className="mt-3 mb-4 pb-2">
                            {values.body}
                        </p>
                        </MDBCardBody>

                        <MDBCardFooter
                        className="py-3 border-0"
                        style={{ backgroundColor: "#f8f9fa" }}
                        >
                        <div className="d-flex flex-start w-100">
                            <MDBTextArea placeholder="Enter Something..."
                                name="body"
                                onChange={onChange}
                                value={values.body}
                                error={error ? true : false} 
                                rows={4} style={{backgroundColor: '#fff'}} wrapperClass="w-100" />
                        </div>
                        <div className="float-end mt-2 pt-1">
                            <MDBBtn size="sm" className="me-1">Post!</MDBBtn>
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

  



