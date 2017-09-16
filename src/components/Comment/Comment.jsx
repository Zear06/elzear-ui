import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Comment, Dimmer, Loader } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import USER_QUERY from '../../graphql/UserQuery.graphql';
import AddComment from './AddComment';
import ListComments from './ListComments';

@graphql(USER_QUERY, {
  options: ({ comment }) => {
    const key = comment._from.split('/')[1];
    return ({
      variables: { key },
    });
  }
})
class CC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reply: false,
      showResponses: false
    };
  }


  reply() {
    return (
      <AddComment
        close={() => this.setState({ reply: false })}
        targetKey={this.props.comment._key}
        targetType='comments'
      />
    );
  }

  showResponses() {
    return (
      <ListComments
        count={this.state.count}
        targetKey={this.props.comment._key}
        targetType='comments'
      />
    );
  }

  render() {
    const { data, comment } = this.props;
    if (data.loading) {
      return (
        <Dimmer active>
          <Loader />
        </Dimmer>
      );
    }
    return (
      <Comment>
        <Comment.Avatar src={`http://api.adorable.io/avatar/80/${data.user.name}`} />
        <Comment.Content>
          <Comment.Author
            as={Link}
            to={`/users/${data.user._key}`}
          >
            {data.user.name}
          </Comment.Author>
          <Comment.Metadata>
            <div>{comment.createdAt}</div>
          </Comment.Metadata>
          <Comment.Text>{comment.text}</Comment.Text>
          <Comment.Actions>
            <Comment.Action
              active={this.state.reply}
              onClick={() => this.setState({ reply: !this.state.reply })}
            >
              Reply
            </Comment.Action>
            <Comment.Action
              active={this.state.showResponses}
              onClick={() => this.setState({ showResponses: !this.state.showResponses })}
            >
              Responses
            </Comment.Action>
          </Comment.Actions>
          {this.state.showResponses ? this.showResponses() : null}
          {this.state.reply ? this.reply() : null}
        </Comment.Content>
      </Comment>
    );
  }
}

CC.propTypes = {
  comment: propTypes.shape({
    _key: propTypes.string
  }).isRequired,
  // targetKey: propTypes.string.isRequired
};

export { CC };
