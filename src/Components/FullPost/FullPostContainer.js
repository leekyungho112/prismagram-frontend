import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import useInput from "../../Hooks/useInput";
import FullPostPresenter from "./FullPostPresenter";
import { TOGGLE_LIKE, ADD_COMMENT } from "./FullPostQueries";
import { useMutation } from "react-apollo-hooks";
import { toast } from "react-toastify";






const FullPostContainer = ({
     id,
     user, 
     files, 
     likeCount,
    isLiked,
    comments,
    createdAt,
    caption,
    location  }) => {
        const [isLikedS, setIsLiked] = useState(isLiked);
        const [likeCountS, setLikeCount] = useState(likeCount);
        const [currentItem, setCurrentItem] = useState(0);
        const [selfComments, setSelfComments] = useState([]);
       
        const comment = useInput("");
        const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
            variables: { postId: id }
          });

        const [addCommentMutation, {loading}] = useMutation(ADD_COMMENT, {
            variables: { postId: id, text: comment.value }
            
          });  
         
          const toggleLike = () => {
            toggleLikeMutation();
            if (isLikedS === true) {
              setIsLiked(false);
              setLikeCount(likeCountS - 1);
            } else {
              setIsLiked(true);
              setLikeCount(likeCountS + 1);
            }
          };
        useEffect(() => {
            const totalFiles = files.length;
            if (currentItem === totalFiles - 1) {
              setTimeout(() => setCurrentItem(0), 3000);
            } else {
              setTimeout(() => setCurrentItem(currentItem + 1), 3000);
            }
          }, [currentItem, files]);
         
          const onKeyPress = async event => {
            const { which } = event;
            if (which === 13) {
              event.preventDefault();
             
              try {
                 
                  const {
                    data: { addComment }
                  } = await addCommentMutation();
                  setSelfComments([...selfComments, addComment]);
                  comment.setValue("");
                            
              } catch {
                toast.error("Cant send comment");
              }
            
            } 
          }; 
        
    return (
    <FullPostPresenter 
               
               user={user}
               files={files}
               likeCount={likeCountS}
               location={location}
               caption={caption}
               isLiked={isLikedS}
               comments={comments}
               createdAt={createdAt}
               newComment={comment}
               setIsLiked={setIsLiked}
               setLikeCount={setLikeCount}
               currentItem={currentItem}
               toggleLike={toggleLike}
               onKeyPress={onKeyPress}
               selfComments={selfComments}
               loading={loading}
               />
    );
};

FullPostContainer.propTypes = {
    id:PropTypes.string.isRequired,
    user:PropTypes.shape({
        id:PropTypes.string.isRequired,
        avatar:PropTypes.string,
        username:PropTypes.string.isRequired
    }).isRequired, 
    files:PropTypes.arrayOf(
        PropTypes.shape({
            id:PropTypes.string.isRequired,
            url:PropTypes.string.isRequired
        })
    ).isRequired, 
    likeCount:PropTypes.number.isRequired,
   isLiked:PropTypes.bool.isRequired,
   comments:PropTypes.arrayOf(
       PropTypes.shape({
        id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        user: PropTypes.shape({
            id: PropTypes.string.isRequired,
            username: PropTypes.string.isRequired
          }).isRequired
       })
   ).isRequired,
   caption: PropTypes.string.isRequired,
   location: PropTypes.string,
   createdAt: PropTypes.string.isRequired
};

export default FullPostContainer;
