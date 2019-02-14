// Package dependencies
import React, { Component, Fragment } from 'react';
import { Table } from 'reactstrap';
import { withApollo } from 'react-apollo';

// Local dependencies
import TableRow from './TableRow.component';
import { FetchMyGames } from '../../graphql/queries/Game';
import { OnGameCreated } from '../../graphql/subscriptions/Game';


class CurrentGames extends Component {
  state = { gamesAvailable: [] };

  componentDidMount() {
    this.getMyGames();
    this.subscribeToMyGames();
  }

  getMyGames = () => {
    this.props.client.query({
      query: FetchMyGames,
      variables: { userId: "1" }
    }).then(response => {
      var myGames = response.data.myGames;
      this.setState({
        gamesAvailable:myGames
      });
    });
  }

  getRows = () => {
    return this.state.gamesAvailable.map((gameData, index) => <TableRow key={index} index={index} onClick={this.joinGame} {...gameData} />);
  };

  subscribeToMyGames = () => {
    this.props.client.subscribe({
      query: OnGameCreated,
      fetchPolicy: "no-cache"
    }).subscribe(data => {
      var game = data.data.gameCreated;
      if (game.creator.id === "1") {
        var actualGames = this.state.gamesAvailable;
        actualGames.push(game);
        this.setState({
          gamesAvailable: actualGames
        });
      }
    });
  }

  render() {
    return (
      <Fragment>
        <h3>My current games</h3>
        <Table striped bordered hover dark>
          <thead>
            <tr>
              <th>#</th>
              <th>Created At</th>
              <th>Time Played</th>
              <th>Turn</th>
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

export default withApollo(CurrentGames);
