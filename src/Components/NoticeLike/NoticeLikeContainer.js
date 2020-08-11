import React from "react";
import { withRouter } from "react-router-dom";
import { SEE_LIKE, READ_LIKE } from "./NoticeLikeQueries";
import NoticeLikePresenter from "./NoticeLikePresenter";
import { useQuery, useMutation } from "react-apollo-hooks";


export default withRouter(({ history, toggleButton}) => {

    const {data, loading} = useQuery(SEE_LIKE);
    const [readLikeMutation] = useMutation(READ_LIKE);

    const handleClick = async (likeId, postId) => {
        try {
            await readLikeMutation({
                refetchQueries:() => [{
                    query: SEE_LIKE,
                }],
                variables: {
                    likeId
                }
            });
            history.push(`/FullFeed/${postId}`);
        } catch (e) {
            console.log(e);
        }
    }
    

    return(
        <NoticeLikePresenter
        data={data}
        loading={loading}
        toggleButton={toggleButton}
        handleClick={handleClick}
        />

    );

});