import React from "react";
import styled from "styled-components";
import { HeartEmpty, Logo } from "../Icons";
import FatText from "../FatText";
import { Link } from "react-router-dom";
import Avatar from "../Avatar";


const Container = styled.div`
    position: relative;
`;

const LoaderContainer = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const NotifiWrapper = styled.div`
    position: absolute;
    top: 40px;
    right: 0px;
    width: 319px;
    height: 270px;
	background: #fff;
    ${props => props.theme.whiteBox}
  
`;

const NotiScroll = styled.div`
    overflow-y: scroll;
    height: inherit;
`;

const NotiLink = styled(Link)`
    ${props => props.theme.whiteBox_bottom}
    display: inline-block;
    width: 100%;
    padding: 10px 0;
`;

const NotifiContainer = styled.div`
    ${props => props.theme.whiteBox_bottom}
    display: flex;
    align-items: center;
    width:100%;
    height: 45px;
    padding: 10px;
`;

const NotiAvatar = styled(Avatar)`
  
`;

const NotiFatText = styled(FatText)`
    margin-left: 10px;
    width: 100%;
    text-align: start;
    overflow:hidden;
	text-overflow:ellipsis;
	white-space:nowrap;
	word-wrap:break-word; 
	word-break:break-all;
`;

const Files = styled.div`
    position: relative;
  padding-bottom: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex-shrink: 0;
 

`;

const File = styled.div`
  width: 100%;
  height: 600px;
  position: absolute;
  top: 0;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  opacity: ${props => (props.showing ? 1 : 0)};
  transition: opacity 0.5s linear;

`;




export default ({
    data,
    loading,
    toggleButton,
    handleClick

}) => {
    if(loading === true){
        return (
            <React.Fragment>
                  {toggleButton === false?
                  (
                      <Container>
                          <HeartEmpty />
                      </Container>
                  ) : (
                      <Container>
                          <HeartEmpty />
                          <NotifiWrapper>
                              <LoaderContainer>
                                  <Logo size={36} />
                              </LoaderContainer>
                          </NotifiWrapper>
                      </Container>
                  )}  

            </React.Fragment>
        );
    } else if(!loading && data && data.seeLike) {
        return(
            <Container>
                <HeartEmpty />
                {toggleButton === false?
                "" : (
                    <NotifiWrapper>
                        <NotiScroll>
                            <NotiLink to="/Notifications">
                                <FatText text="팔로우 유저 보기" />
                            </NotiLink>
                                {data.seeLike.map(likeUser => (
                                    likeUser.readCheck === false &&
                                    <NotifiContainer
                                        onClick={() => handleClick(
                                            likeUser.id,
                                            likeUser.post.id
                                        )}
                                        key={likeUser.user.id}
                                    >
                                        <NotiAvatar size={"sm"} url={likeUser.user.avatar} />
                                        <NotiFatText
                                            text={`${likeUser.user.username}님이 좋아요를 눌렀습니다.`} />
                                        <Files>
                                            <File key={likeUser.post.files.id} src={likeUser.post.files.url} />
                                        </Files>
                                        
                                    </NotifiContainer>
                                ))}
                        </NotiScroll>
                    </NotifiWrapper>
                )}
            </Container>
        );
    }
    return null;
};
