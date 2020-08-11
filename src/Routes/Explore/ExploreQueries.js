import { gql } from "apollo-boost";

export const ALL_USERS = gql`
    query {
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

        randomPost {
            id
            files {
                id
                url
            }
            likeCount
            commentCount
        }
    }

`;