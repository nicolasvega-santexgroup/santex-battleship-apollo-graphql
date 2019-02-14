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

export { 
    OnGameCreated 
};