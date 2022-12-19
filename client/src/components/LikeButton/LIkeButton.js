import React, { useEffect, useState } from "react";
import { MDBBtn, MDBIcon, MDBBadge } from "mdb-react-ui-kit";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { LIKE_POST } from "../../utils/mutations";

import Popup from "../../utils/Popup";

export function LikeButton({ id, likes, likeCount, user }) {
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        if (user && likes.find((like) => like.username === user.username)) {
        setLiked(true);
        } else setLiked(false);
    }, [user, likes]);

    const [likePost] = useMutation(LIKE_POST, {
        variables: { postId: id },
    });

    const likeButton = user ? (
        liked ? (
        <MDBBtn color="teal">
            <MDBIcon fas icon="heart"/>
        </MDBBtn>
        ) : (
        <MDBBtn color="teal" basic>
            <MDBIcon fas icon="heart"/>
        </MDBBtn>
        )
    ) : (
        <MDBBtn as={Link} to="/login" color="teal" basic>
            <MDBIcon fas icon="heart"/>
        </MDBBtn>
    );

    return (
        <div>
        <MDBBtn as="div" onClick={likePost}></MDBBtn>
        <Popup content={liked ? "Unlike" : "Like"}>{likeButton}</Popup>
        <MDBBadge color="teal" pointing="left">
            {likeCount}
        </MDBBadge>
        </div>
        
    );
    }

export default LikeButton;