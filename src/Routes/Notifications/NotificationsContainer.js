import React from "react";
import { useQuery } from "react-apollo-hooks";
import NotificationsPresenter from "./NotificationsPresenter";
import { FOLLOWER } from "./NotificationsQueries";



export default () => {
    const { data, loading } = useQuery(FOLLOWER, {
        fetchPolicy: "cache-and-network"
    });

    return <NotificationsPresenter data={data} loading={loading} />
    
};