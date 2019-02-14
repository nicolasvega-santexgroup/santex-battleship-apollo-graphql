// Package dependencies
import React, { Component, Fragment } from 'react';
import { Col, Row, Button } from 'reactstrap';
import { graphql, compose } from 'react-apollo';

// Local dependencies
import CurrentGames from '../current_games/CurrentGames.component';
import GamesPool from '../games_pool/GamesPool.component';
import { FetchMyUser } from '../../graphql/queries/User';
import { CreateGame } from '../../graphql/mutations/Game';

// Styles
import classes from './Home.module.scss';

const TITLE = 'Battleship';

class Home extends Component {
  onClick() {
    var me = this.props.data.me;
    this.props.mutate({
      variables: { userId: me.id, username: me.name  }
    })
      .then(({ data }) => {
        console.log('got data', data);
      }).catch((error) => {
        console.log('there was an error sending the query', error);
      });
  }

  render() {
    return (
      <Fragment>
        <div className={classes.home}>
          <Row>
            <Col xs={{ size: 12 }}>
              <div className="title">
                <h1>{TITLE}</h1>
              </div>
            </Col>
            <Col xs={{ size: 4, offset: 8 }} className="text-right">
              <Button color="info" onClick={this.onClick.bind(this)}>New Game</Button>
            </Col>
          </Row>
          <Row>
            <Col xs="6">
              <GamesPool/>
            </Col>
            <Col xs="6">
              <CurrentGames/>
            </Col>
          </Row>
        </div>
      </Fragment>
    );
  }
}

export default compose(
  graphql(FetchMyUser),
  graphql(CreateGame)
)(Home);