// Package dependencies
import React, { Component, Fragment } from 'react';
import { Table } from 'reactstrap';
import { withApollo } from 'react-apollo';

// Local dependencies
import TableRow from './TableRow.component';
import { FetchGamesPool } from '../../graphql/queries/Game';
import { OnGameCreated } from '../../graphql/subscriptions/Game';

class GamesPool extends Component {
  state = { gamesAvailable: []};

  componentDidMount() {
    this.getGamesPool();
    this.subscribeToGamePool();
  }

  getGamesPool = () => {
    this.props.client.query({
      query: FetchGamesPool,
      variables: { userId: "1" }
    }).then(response => {
      var gamesPool = response.data.gamesPool;
      this.setState({
        gamesAvailable:gamesPool
      });
    });
  }

  subscribeToGamePool = () => {
    this.props.client.subscribe({
      query: OnGameCreated,
      fetchPolicy: "no-cache"
    }).subscribe(data => {
      var game = data.data.gameCreated;
      if (game.creator.id !== "1"){
        var actualGames = this.state.gamesAvailable;
        actualGames.push(game);
        this.setState({
          gamesAvailable: actualGames
        });
      }
    });
  }

  getRows = () => {    
    return this.state.gamesAvailable.map((gameData, index) => <TableRow key={index} index={index} onClick={this.joinGame} {...gameData} />);
  };

  render() {
    return (
      <Fragment>
        <h3>Games Pool</h3>
        <Table striped bordered hover dark>
          <thead>
            <tr>
              <th>#</th>
              <th>Created At</th>
              <th>Player</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.getRows()}
          </tbody>
        </Table>
      </Fragment>
    );
  }
}

export default withApollo(GamesPool);
