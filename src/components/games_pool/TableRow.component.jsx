// Package dependencies
import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { graphql, compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';

// Local dependencies
import { formatDatetime } from '../../helpers/formatters/commons';
import { FetchMyUser } from '../../graphql/queries/User';
import { JoinGame } from '../../graphql/mutations/Game';

class TableRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false
    };
  }

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };

  onClick() {
    var id = this.props.id;
    var me = this.props.data.me;
    console.log(id);
    console.log(me);

    this.props.mutate({
        variables: {
          id,
          userId: me.id,
          username: me.name
        }
      })
      .then(({ data }) => {
        if (data.joinGame === true) {
          this.props.history.push(`/game/${id}`);
        }
      })
      .catch((error) => {
        console.log('there was an error sending the query', error);
      });
  }

  render() {
    const { index, createdAt, creator } = this.props;

    return (
      <tr>
        <td>{index}</td>
        <td>{formatDatetime(createdAt)}</td>
        <td>{creator.name}</td>
        <td>
          <Button color="info" onClick={this.onClick.bind(this)}>Play</Button>
        </td>
      </tr>
    );
  }
}

export default compose(
  graphql(FetchMyUser),
  graphql(JoinGame)
)(withRouter(TableRow));