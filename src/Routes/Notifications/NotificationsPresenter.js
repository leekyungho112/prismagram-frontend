import React from "react";
import styled from "styled-components";
import Loader from "../../Components/Loader";
import { Helmet } from "react-helmet";
import UserCard from "../../Components/UserCard";
import FatText from "../../Components/FatText";

const Wrapper = styled.div`
   min-height: 100vh;
`;

const Section = styled.div`
   margin-bottom: 50px;
    display: grid;
    grid-gap: 45px;
    grid-template-columns: repeat(4, 200px);
`;




export default ({ data, loading }) => {
    if(loading === true){
        return(
            <Wrapper>
                <Loader />
            </Wrapper>
        );
    } else if(!loading && data && data.me) {
        const {
            me: { followers }
        } = data; 
        console.log(data);

        return (
            <Wrapper>
                <Helmet>
                    <title> 알림 </title>
                </Helmet>
        
            <Section>
            {followers.length === 0? (
                            <FatText text="No notifications" />
                        ) : ""
                    }
                    <FatText text="팔로워 유저 보기" />  
          {followers &&  
                        followers.map(user => (
                             <UserCard 
                                key={user.id}
                                id={user.id}
                                url={user.avatar}
                                username={user.username}
                                isFollowing={user.isFollowing}
                                isSelf={user.isSelf}
                            />
                    ))}
                
            </Section>
          </Wrapper>
            
        );
                   
    }
  

};