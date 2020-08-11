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
              data && 
              data.seeFullPost && (
                <FullPost 
                    key={data.seeFullPost.id}
                    id={data.seeFullPost.id}
                    location={data.seeFullPost.location}
                    caption={data.seeFullPost.caption}
                    user={data.seeFullPost.user}
                    files={data.seeFullPost.files}
                    isLiked={data.seeFullPost.isLiked}
                    likeCount={data.seeFullPost.likeCount}
                    comments={data.seeFullPost.comments}
                    createdAt={data.seeFullPost.createdAt}
                />
            )}
    </Wrapper>
);
};