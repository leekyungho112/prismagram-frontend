import React from "react";
import styled from "styled-components";
import Loader from '../../Components/Loader';
import { Helmet } from "react-helmet";
import FatText from "../../Components/FatText"
import UserCard from "../../Components/UserCard";


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
    button {
        margin-top: 48px;
    }
`;


const UserCards = styled.div``;

const UserSection = styled(Section)`
    grid-template-columns: repeat(4, 200px);
    grid-template-rows: 200px;
    grid-auto-rows: 200px;

`;

export default ({ data, loading}) => {

    if (loading === true) {
        return (
          <Wrapper>
            <Loader />
          </Wrapper>
        );

        }else if(!loading && data && data.allUser){
         
         return (
                <Wrapper>
                  <Helmet>
                    <title> Explore | Prismagram</title>
                </Helmet>
                <UserCards>
                <Text text="회원님을 위한 추천" />
                    <UserSection>
                     {data.allUser.map(user => (
                           <UserCard
                           key={user.id}
                           id={user.id}
                           url={user.avatar}
                           username={user.username}
                           isFollowing={user.isFollowing}
                           isSelf={user.isSelf}
                           />     
                        
                    )) }  
                    </UserSection>
                    </UserCards> 
                </Wrapper>
            );
        }
};