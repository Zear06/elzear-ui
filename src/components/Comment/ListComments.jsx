import React, { Component } from 'react';
import { Comment, Dimmer, Loader } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import type { OptionProps } from 'react-apollo';
import LIST_COMMENT from '../../graphql/CommentsQuery.graphql';
import CC from './Comment';

type Props = OptionProps;

@graphql(LIST_COMMENT, {
  options: ({ targetType, targetKey }) => ({
    variables: { targetId: `${targetType}/${targetKey}` },
  })
})
class ListComments extends Component<Props> {
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

export default ListComments;
