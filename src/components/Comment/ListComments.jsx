import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Comment, Dimmer, Loader } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import LIST_COMMENT from '../../graphql/CommentsQuery.graphql';
import { CC } from './Comment';


@graphql(LIST_COMMENT, {
  options: ({ targetType, targetKey }) => {
    return ({
      variables: { targetId: `${targetType}/${targetKey}` },
    });
  }
})
class ListComments extends Component {
  render() {
    const { data } = this.props;
    if (data.loading) {
      return (
        <Dimmer active>
          <Loader />
        </Dimmer>
      );
    }
    const r = data.comments.map(comment => (
      <CC comment={comment} key={comment._key} refetch={data.refetch} />
    ));
    return (
      <Comment.Group>
        {r.length ? r : 'None'}
      </Comment.Group>
    );
  }
}

ListComments.propTypes = {
  targetType: propTypes.string.isRequired,
  targetKey: propTypes.string.isRequired
};

export default ListComments;
