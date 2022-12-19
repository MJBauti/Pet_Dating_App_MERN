import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { MDBBtn, MDBModal, MDBIcon, 
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import { GET_SINGLE_POST } from "../../utils/queries";
import { DELETE_COMMENT } from "../../utils/mutations";
import { DELETE_POST } from "../../utils/mutations";
import Popup from "../../utils/Popup";

export function DeleteButton({ postId, commentId, callback }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const mutation = commentId ? DELETE_COMMENT : DELETE_POST;

  const [deletePost] = useMutation(mutation, {
    update(proxy) {
      setConfirmOpen(false);
      if (!commentId) {
        const data = proxy.readQuery({
          query: GET_SINGLE_POST,
        });
        Object.getPosts = data.getPosts.filter((p) => p.id !== postId);
        proxy.writeQuery({ query: GET_SINGLE_POST, data });
      }
      if (callback) callback();
    },
    variables: {
      postId,
      commentId,
    },
  });

  return (
    <>
      <Popup content={commentId ? "Delete Comment" : "Delete Post"}>
        <MDBBtn
          as="div"
          color="danger"
          size="sm"
          onClick={() => setConfirmOpen(true)}
        >
          <MDBIcon className="fas fa-trash" style={{ margin: 0 }} />
        </MDBBtn>
      </Popup>
      <MDBModal show={confirmOpen} onHide={() => setConfirmOpen(false)}>
        <MDBModalHeader>
          <MDBModalTitle>Confirm Delete</MDBModalTitle>
        </MDBModalHeader>
        <MDBModalBody>Are you sure you want to delete this item?</MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={() => setConfirmOpen(false)}>
            Cancel
          </MDBBtn>
          <MDBBtn color="danger" onClick={deletePost}>
            Delete
          </MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </>
  );
};

export default DeleteButton;