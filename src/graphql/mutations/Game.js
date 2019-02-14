import gql from 'graphql-tag';

const CreateGame = gql`
 mutation ($userId: ID!, $username: String!){
    createGame (userId: $userId, username: $username){
      id
      creator {
        name
      }
      status
      opponent {
        name
      }
      createdAt
    }
  }  
 `

const JoinGame = gql`
mutation ($id: ID!, $userId: ID!, $username: String!) {
    joinGame  (id: $id, userId: $userId, username: $username)
}
 `;

export {
  CreateGame,
  JoinGame
};
