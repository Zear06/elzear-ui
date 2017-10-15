import React, { Component } from 'react';
import { Comment, Dimmer, Loader } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import type { OptionProps } from 'react-apollo';
import { Link } from 'react-router-dom';
import USER_QUERY from '../../graphql/UserQuery.graphql';
import AddComment from './AddComment';
import ListComments from './ListComments';

type Props = {
  comment: {
    _key: string,
    text: string,
    createdAt: string
  }
} & OptionProps;

type State = {
  showInput: boolean,
  showResponses: boolean
};

@graphql(USER_QUERY, {
  options: ({ comment }) => {
    const key = comment._from.split('/')[1];
    return ({
      variables: { key },
    });
  }
})
class CC extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      showInput: false,
      showResponses: false
    };
  }

  reply() {
    return (
      <AddComment
        close={() => this.setState({ showInput: false })}
        targetKey={this.props.comment._key}
        targetType='comments'
      />
    );
  }

  showResponses() {
    return (
      <ListComments
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
              active={this.state.showInput}
              onClick={() => this.setState({ showInput: !this.state.showInput })}
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
          {this.state.showInput ? this.reply() : null}
        </Comment.Content>
      </Comment>
    );
  }
}

export default CC;
