// Package dependencies
import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { withApollo } from 'react-apollo';

// Local dependencies
import Board from '../board/Board.component';
import SurrenderModal from '../surrender_modal/SurrenderModal.component';
import { FetchGame } from '../../graphql/queries/Game';
import { FetchMyUser } from '../../graphql/queries/User';
import { Shoot } from '../../graphql/mutations/Game';
import { OnShoot } from '../../graphql/subscriptions/Game';


class Game extends Component {
  state = { game: {}, me: {} };

  componentDidMount() {
    this.getGame();
    this.getMyUser();
    this.subscribeToShoot();
  }

  getMyUser = () => {
    this.props.client.query({
      query: FetchMyUser,
      //variables: { id }
    }).then(response => {
      var me = response.data.me;
      this.setState({ me });
    });
  }

  getGame = () => {
    this.props.client.query({
      query: FetchGame,
      variables: { id: this.props.match.params.id }
    }).then(response => {
      var game = response.data.game;
      this.setState({ game });
    });
  }

  subscribeToShoot = () => {
    this.props.client.subscribe({
      query: OnShoot,
      fetchPolicy: "no-cache"
    }).subscribe(data => {
      var newBoard = data.data.newShoot.board;
      // console.log('on shoot', shoot);
      var game = this.state.game;
      game.opponent.board = newBoard;
      this.setState({
        game
      });
      // if (game.creator.id !== "1"){
      //   var actualGames = this.state.gamesAvailable;
      //   actualGames.push(game);
      //   this.setState({
      //     gamesAvailable: actualGames
      //   });
      // }
    });
  }

  constructor(props) {
    super(props);
    this.state = { game: {}, me: {} };
  }

  onClick = (x, y, newStatus) => {
    // TODO: Make a mutation to modify Game's current status based on the current action
    console.log('$ x, y, newStatus', x, y, newStatus); // eslint-disable-line
    var game = this.state.game;
    var me = this.state.me;

    this.props.client.mutate({
      mutation: Shoot,
      variables: {
        gameId: game.id,
        userId: me.id,
        x,
        y
      }
    })
      .then(({ data }) => {
        console.log('shoot data');
        console.log(data);
      })
      .catch((error) => {
        console.log('there was an error sending the query', error);
      });
  };

  surrenderGame = () => {
    // TODO: Make a mutation to modify Game's current status based on the current action
    console.log('$ Player surrenders !'); // eslint-disable-line
  };

  render() {
    var game = this.state.game;
    var me = this.state.me;
    console.log(me);
    // return (<div>game</div>)
    if (!game.id || !me.id) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      )
    } else {
      if (me.id === game.creator.id) {
        return (
          <div>
            <Row className="game">
              <Col xs={{ size: 6 }}>
                <h3 className="text-center">{game.creator.name}</h3>
                <Board
                  matrix={game.creator.board}
                  myBoard={true}
                  onClick={this.onClick}
                />
                <div className="mt-3 text-center">
                  <SurrenderModal onClick={this.surrenderGame} />
                </div>
              </Col>
              <Col xs={{ size: 6 }}>
                <h3 className="text-center">{game.opponent.name}</h3>
                <Board
                  matrix={game.opponent.board}
                  myBoard={false}
                  onClick={this.onClick}
                />
              </Col>
            </Row>
          </div>
        )
      } else {
        return (
          <div>
            <Row className="game">
              <Col xs={{ size: 6 }}>
                <h3 className="text-center">{game.creator.name}</h3>
                <Board
                  matrix={game.creator.board}
                  myBoard={false}
                  onClick={this.onClick}
                />
              </Col>
              <Col xs={{ size: 6 }}>
                <h3 className="text-center">{game.opponent.name}</h3>
                <Board
                  matrix={game.opponent.board}
                  myBoard={true}
                  onClick={this.onClick}
                />
                <div className="mt-3 text-center">
                  <SurrenderModal onClick={this.surrenderGame} />
                </div>
              </Col>
            </Row>
          </div>
        )
      }
    }

  }
}

export default withApollo(Game);
