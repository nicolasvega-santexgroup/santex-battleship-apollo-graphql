import gql from 'graphql-tag';


const OnGameCreated = gql`
subscription OnGameCreated {
    gameCreated {
        id
        creator {
            id
            name
        }    
        createdAt
    }
}
`;

const OnShoot = gql`
subscription OnShoot {
    newShoot {
        gameId
        board
    }
}
`;

export { 
    OnGameCreated,
    OnShoot
};