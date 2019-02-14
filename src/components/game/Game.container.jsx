// Package dependencies
import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { withApollo } from 'react-apollo';

// Local dependencies
import Board from '../board/Board.component';
import SurrenderModal from '../surrender_modal/SurrenderModal.component';
import { FetchGame } from '../../graphql/queries/Game';


const MOCK_GAME_MATRIX = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];


class Game extends Component {
  state = { game: {} };

  componentDidMount() {
    this.getGame();
  }

  getGame = () => {
    this.props.client.query({
      query: FetchGame,
      variables: { id: this.props.match.params.id }
    }).then(response => {
      var game = response.data.game;
      console.log(game);
      this.setState({
        game: game
      });
    });
  }


  constructor(props) {
    super(props);
    this.state = { game: {} };
  }

  onClick = (x, y, newStatus) => {
    // TODO: Make a mutation to modify Game's current status based on the current action
    console.log('$ x, y, newStatus', x, y, newStatus); // eslint-disable-line
  };

  surrenderGame = () => {
    // TODO: Make a mutation to modify Game's current status based on the current action
    console.log('$ Player surrenders !'); // eslint-disable-line
  };

  render() {
    return (
      <div>
        <Row className="game">
          <Col xs={{ size: 6 }}>
            <Board
              matrix={this.state.creator.board}
              onClick={this.onClick}
            />
          </Col>
          <Col xs={{ size: 6 }}>
            <Board
              matrix={this.state.opponent.board}
              onClick={this.onClick}
            />
          </Col>
        </Row>
        <Row className="buttons">
          <Col xs={{ size: 8, offset: 2 }} className="mt-3 text-center">
            <SurrenderModal onClick={this.surrenderGame} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default withApollo(Game);
