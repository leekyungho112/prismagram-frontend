import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import Loader from "../Components/Loader";
import Post from "../Components/Post";
import UserCard from "../Components/UserCard";


const FEED_QUERY = gql`
{
    seeFeed{
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
        commentCount
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


    allUser{
            id
            username
            avatar
            isFollowing
            isSelf
            posts {
                id
                files {
                    id
                    url
                }
                likeCount
                commentCount
            }
        }


}


`;


const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 80vh;
 `;

const Section = styled.div`
    margin-top: 15px;
    margin-bottom: 50px;
    display: grid;
    grid-gap: 45px;
    grid-template-columns: repeat(4, 200px);
    grid-template-rows: 200px;
    grid-auto-rows: 200px;
   
`;
const UserCardItem = styled(Section)`
  grid-template-columns: repeat(4, 200px);
  grid-template-rows: 100px;
  grid-auto-rows: 100px;
`;


export default ({match: {params: {id}}}) => {
    const { data, loading} = useQuery(FEED_QUERY,{
        variables: { id},
        fetchPolicy: "cache-and-network"
    });
    
    if (!data){
        return(
            <Wrapper>
                <Loader />
            </Wrapper>
        );
        } else if (data.allUser && data.seeFeed.length === 0){
    return (
        <Wrapper>
            <Helmet>
              <title>Feed | Prismagram</title>
            </Helmet>
            <UserCardItem >
             {data.allUser.map(user =>(
                <UserCard
                key={user.id}
                id={user.id}
                url={user.avatar}
                username={user.username}
                isFollowing={user.isFollowing}
                isSelf={user.isSelf}
                />     
                ))
            }
                </UserCardItem>
        </Wrapper>
            
    );
  
} else if ( data && data.seeFeed){
return (
    <Wrapper>
         <Helmet>
              <title>Feed | Prismagram</title>
            </Helmet>
        {loading && <Loader />}
        {!loading && data && data.seeFeed && 
         data.seeFeed.map(post => 
         <Post key={post.id}
               id={post.id}
               location={post.location}
               caption={post.caption} 
               user={post.user}
               files={post.files}
               likeCount={post.likeCount}
               isLiked={post.isLiked}
               commentCount={post.commentCount}
               comments={post.comments}
               createdAt={post.createdAt}
               />)}
    </Wrapper>
       );
  }
  return null;
};