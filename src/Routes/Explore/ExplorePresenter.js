import React from "react";
import styled from "styled-components";
import Loader from '../../Components/Loader';
import { Helmet } from "react-helmet";
import FatText from "../../Components/FatText"
import UserCard from "../../Components/UserCard";
import SquarePost from "../../Components/SquarePost";


const Wrapper = styled.div`
        min-height: 100vh;   
`;
const Text = styled(FatText)`
    color: ${props => props.theme.darkGreyColor};
   
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

const PostSection = styled(Section)`
  grid-template-columns: repeat(4, 200px);
  grid-template-rows: 200px;
  grid-auto-rows: 200px;
`;


const UserCards = styled.div``;

const UserCardItem = styled(Section)`
  grid-template-columns: repeat(4, 200px);
  grid-template-rows: 100px;
  grid-auto-rows: 100px;
`;

export default ({ data, loading}) => {

    if (loading === true) {
        return (
          <Wrapper>
            <Loader />
          </Wrapper>
        );

        } else if (!data.allUser || !data.randomPost){
          return (
            <Wrapper>
            <div>다른 계정들이 추가되지 않았습니다.</div>
          </Wrapper>

          );
        
        } else if(!loading && data && data.allUser && data.randomPost){
         
         return (
                <Wrapper>
                  <Helmet>
                    <title> Explore | Prismagram</title>
                </Helmet>
                <UserCards>
                <Text text="회원님을 위한 추천" />
                {data.allUser.length === 0 ?(
                  <FatText text="사용자를 찾을수 없습니다" />
                ) : (
                  <UserCardItem >
                    {data.allUser.map(user => (
                          <UserCard
                           key={user.id}
                           id={user.id}
                           url={user.avatar}
                           username={user.username}
                           isFollowing={user.isFollowing}
                           isSelf={user.isSelf}
                           />     
                     
                    ))}
                      </UserCardItem> 
                )}
                    </UserCards> 
                    <Text text="인기 게시글" />  
                    <PostSection>
                    {data.randomPost.length === 0 ? (
                        <FatText text="게시물을 찾을 수 없습니다." />
                    ):(data.randomPost.map(post =>(
                        <SquarePost 
                          key={post.id}
                          id={post.id}
                          likeCount={post.likeCount}
                          filesCount={post.files}
                          commentCount={post.commentCount}
                          file={post.files[0]}
                        />
                    ))
                    )}
                </PostSection>   
                </Wrapper>
            );
        }
};