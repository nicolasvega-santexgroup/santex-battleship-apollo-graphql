import gql from 'graphql-tag';

const FetchGamesPool = gql`
query GamesPool ($userId: ID!) {
    gamesPool(userId:$userId) {
        id
        creator {
            name
        }
        createdAt
    }
}
 `;

const FetchMyGames = gql`
 query MyGames($userId: ID!) {
    myGames(userId: $userId) {
        id
        creator {
            name
        }
        createdAt
    }
  }
 `;

 const FetchGame = gql`
query GetGame ($id: ID!){
    game(id: $id){
        id
        status
        creator {
            id
            name
            board
        }
        opponent {
            id
            name
            board
        }
    }
}
 `;


export {
    FetchGamesPool,
    FetchMyGames,
    FetchGame
};
