import { gql } from "apollo-boost";


export const FOLLOWER = gql`
     {
        me {
            followers {
                id
                username
                avatar
                isFollowing

            }
        }
    }


`;