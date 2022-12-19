import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { MDBBtn, MDBModal, MDBIcon } from "mdb-react-ui-kit";
import { GET_SINGLE_POST } from "../../utils/queries";
import { DELETE_COMMENT } from "../../utils/mutations";
import { DELETE_POST } from "../../utils/mutations";
import Popup from "../../utils/Popup";

function DeleteButton({ postId, commentId, callback }) {
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
        <MDBModal.Header>
          <MDBModal.Title>Confirm Delete</MDBModal.Title>
        </MDBModal.Header>
        <MDBModal.Body>Are you sure you want to delete this item?</MDBModal.Body>
        <MDBModal.Footer>
          <MDBBtn color="secondary" onClick={() => setConfirmOpen(false)}>
            Cancel
          </MDBBtn>
          <MDBBtn color="danger" onClick={deletePost}>
            Delete
          </MDBBtn>
        </MDBModal.Footer>
      </MDBModal>
    </>
  );
};

export default DeleteButton;