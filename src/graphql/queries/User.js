import { gql } from 'apollo-boost';

const FetchMyUser = gql`
query MyUser {
    me(id: "1") {
        id
        name
    }
}`;

 export {
    FetchMyUser
  };