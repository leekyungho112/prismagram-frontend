import React from "react";
import { useQuery } from "react-apollo-hooks";
import { ALL_USERS } from "./ExploreQueries";
import ExplorePresenter from "./ExplorePresenter";


export default () => {
    const { data, loading} = useQuery(ALL_USERS, {
        fetchPolicy: "cache-and-network"
    });
    return (
        <ExplorePresenter data={data} loading={loading} />
    );


};