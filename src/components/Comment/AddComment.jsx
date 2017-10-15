import React, { Component } from 'react';
import { Button, Form, TextArea } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import type { OptionProps } from 'react-apollo';
import SUBMIT_COMMENT from '../../graphql/CommentMutate.graphql';
import LIST_COMMENT from '../../graphql/CommentsQuery.graphql';

type Props = {
  targetType: string,
  targetKey: string
} & OptionProps;
type State = { text: string };

@graphql(SUBMIT_COMMENT)
class AddComment extends Component<Props, State> {
  state = {
    text: ''
  };

  setText(text: string) {
    this.setState({ text });
  }

  submit() {
    const { text } = this.state;
    const targetId = `${this.props.targetType}/${this.props.targetKey}`;
    this.props.mutate({
      variables: { targetId, text },
      // optimisticResponse: {
      //   createdAt: new Date(),
      //   text,
      //   // _from: "users/1328112",
      //   _to: targetId,
      //   __typename: 'Comment'
      // },
      update:
        (store, resp) => {
          const commentAdd = resp.data.commentAdd;
          try {
            const data = store.readQuery({
              query: LIST_COMMENT,
              variables: { targetId },
            });
            data.comments.push(commentAdd);
            store.writeQuery({
              query: LIST_COMMENT,
              variables: { targetId },
              data
            });
          } catch (e) {
            console.log('e', e);
          }
        }
    });
  }

  render() {
    return (
      <Form onSubmit={() => this.submit()} className='comment-add'>
        <TextArea
          name='description'
          type='text'
          onChange={e => this.setText(e.target.value)}
        />
        <Button type='Submit'>Add Comment</Button>
        <Button type='button' onClick={this.props.close}>Cancel</Button>
      </Form>
    );
  }
}

export default AddComment;
