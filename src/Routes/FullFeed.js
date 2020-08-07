import React from "react";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { Helmet } from "react-helmet";
import FullPost from "../Components/FullPost";
import Loader from "../Components/Loader";
import { useQuery } from "react-apollo-hooks";

const FULLFEED_QUERY = gql`
 query seeFullPost($id: String!){
    seeFullPost(id: $id) {
        id
        location
        caption
        user{
            id
            avatar
            username
        }
        files{
            id
            url
        }
        likeCount
        isLiked
        comments {
            id
            text
            user{
                id
                username
            }
           
        }
        createdAt
    }
    }

`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 80vh;

`;

export default ({match: {params: { id }}}) => {
    const { data, loading} = useQuery(FULLFEED_QUERY,{
        variables: { id },
        fetchPolicy: "cache-and-network"
    });
return (
    <Wrapper>
         <Helmet>
              <title>Full Feed | Prismagram</title>
            </Helmet>
        {loading && <Loader />}
        {!loading &&
              data && data.seeFullPost &&
              data.seeFullPost.map(post =>
                <FullPost 
                    key={post.id}
                    id={post.id}
                    location={post.location}
                    caption={post.caption}
                    user={post.user}
                    files={post.files}
                    isLiked={post.isLiked}
                    likeCount={post.likeCount}
                    comments={post.comments}
                    createdAt={post.createdAt}
                />
            )}
    </Wrapper>
);
};