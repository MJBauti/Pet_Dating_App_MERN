import React, { useEffect, useState } from "react";
import { MDBBtn, MDBBadge } from "mdb-react-ui-kit";
import { useMutation, useQuery } from "@apollo/client";
import { LIKE_POST } from "../../utils/mutations";
import { QUERY_USER } from '../../utils/queries';

export function LikeButton({ id, likes, likeCount, email }) {
    const [liked, setLiked] = useState(false);
    const { loading, data } = useQuery(QUERY_USER);
    const userData = data?.user || {};

    useEffect(() => {
        if (email && likes.find((like) => like.email === userData.email)) {
        setLiked(true);
        } else setLiked(false);
    }, [email, likes]);

    const [likePost] = useMutation(LIKE_POST, {
        variables: { postId: id },
    });

    // const likeButton = email ? (
    //     liked ? (
    //     <MDBBtn>
    //         ❤️
    //     </MDBBtn>
    //     ) : (
    //     <MDBBtn>
    //         ❤️
    //     </MDBBtn>
    //     )
    // ) : (
    //     <MDBBtn as={Link} to="/login" color="teal" basic>
    //         <MDBIcon fas icon="heart"/>
    //     </MDBBtn>
    // );

    return (
        <div>
        <MDBBtn as="div" onClick={likePost}>❤️</MDBBtn>
        <MDBBadge className='ms-2'>
            {likeCount}
        </MDBBadge>
        </div>
        
    );
    }

export default LikeButton;
