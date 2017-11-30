import React, { Component } from 'react';
import { Button, Form, TextArea } from 'semantic-ui-react';
import type { OptionProps } from 'react-apollo';
import { graphql } from 'react-apollo';
import SUBMIT_POLL from '../../graphql/PollOnGroupMutate.graphql';
import LIST_POLLS from '../../graphql/PollsQuery.graphql';

type Props = {
  groupKey: string
} & OptionProps;
type State = { name: string, type: string, description: string };

@graphql(SUBMIT_POLL)
class AddPollOnGroup extends Component<Props, State> {
  state = {
    name: '',
    description: '',
    type: 'majority'
  };

  setText(name: string) {
    this.setState({ name });
  }

  submit() {
    const { name, description, type } = this.state;
    const { groupKey } = this.props;
    this.props.mutate({
      variables: {
        groupKey, name, description, type
      },
      // optimisticResponse: {
      //   createdAt: new Date(),
      //   text,
      //   // _from: "users/1328112",
      //   _to: targetId,
      //   __typename: 'Comment'
      // },
      update:
        (store, resp) => {
          const pollAddOnGroup = resp.data.pollAddOnGroup;
          try {
            const data = store.readQuery({
              query: LIST_POLLS,
              variables: { groupKey },
            });
            data.pollsOnGroup.push(pollAddOnGroup);
            store.writeQuery({
              query: LIST_POLLS,
              variables: { groupKey },
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
      <Form onSubmit={() => this.submit()} className='poll-add'>
        <TextArea
          name='description'
          type='text'
          onChange={e => this.setText(e.target.value)}
        />
        <Button type='Submit'>Add Poll</Button>
        <Button type='button' onClick={this.props.close}>Cancel</Button>
      </Form>
    );
  }
}

export default AddPollOnGroup;
