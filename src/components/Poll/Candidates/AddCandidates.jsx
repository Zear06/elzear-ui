import React, { Component } from 'react';
import * as _ from 'lodash';
import { graphql } from 'react-apollo';
import type { OptionProps } from 'react-apollo';
import { Button, Input, List } from 'semantic-ui-react';
import ADD from '../../../graphql/PollAddCandidatesMutate.graphql';

type Props = {
  candidates: Array<string>,
  pollKey: string
} & OptionProps;
type State = {
  newCandidates: Array<string>,
  edit: string
};

@graphql(ADD)
class AddCandidates extends Component<Props, State> {
  state = {
    newCandidates: [],
    edit: ''
  };

  componentWillReceiveProps(nextProps : Props) {
    this.setState(state => ({
      newCandidates: _.difference(state.newCandidates, nextProps.candidates)
    }));
  }

  validate(value: string) {
    return value !== ''
      && !this.props.candidates.some(candidate => candidate === value)
      && !this.state.newCandidates.some(candidate => candidate === value);
  }

  _handleKeyPress = (e : {key: string}) => {
    if (e.key === 'Enter') {
      this.add();
    }
  };

  add = () => {
    if (this.validate(this.state.edit.trim())) {
      this.setState({
        newCandidates: [...this.state.newCandidates, this.state.edit.trim()],
        edit: ''
      });
    }
  };

  submit = () => {
    const candidates = JSON.stringify(this.state.newCandidates);
    const { pollKey } = this.props;

    this.props.mutate({
      variables: { pollKey, candidates },
      // optimisticResponse: {
      //   createdAt: new Date(),
      //   text,
      //   // _from: "users/1328112",
      //   _to: targetId,
      //   __typename: 'Comment'
      // },
      update:
        (store, resp) => {
          console.log('resp.data', resp.data);

          // const commentAdd = resp.data.commentAdd;
          // try {
          //   const data = store.readQuery({
          //     query: LIST_COMMENT,
          //     variables: { targetId },
          //   });
          //   data.comments.push(commentAdd);
          //   store.writeQuery({
          //     query: LIST_COMMENT,
          //     variables: { targetId },
          //     data
          //   });
          // } catch (e) {
          //   console.log('e', e);
          // }
        }
    });
  };

  _onChange = (e: { target: { value: string } }) => {
    const value = e.target.value;
    this.setState({
      edit: value
    });
  };

  render() {
    const valid = this.validate(this.state.edit);
    const r = this.state.newCandidates.map(candidate => (
      <List.Item key={candidate}>
        <List.Content>
          {candidate}
        </List.Content>
      </List.Item>
    ));
    return (
      <div>
        <List className='candidates'>
          {r}
        </List>
        <Input
          error={!valid}
          value={this.state.edit}
          onChange={this._onChange}
          onKeyPress={this._handleKeyPress}
        />
        <Button onClick={this.add} disabled={!valid}>Add candidate</Button>
        <Button onClick={this.submit}>Add all</Button>
      </div>
    );
  }
}

export default AddCandidates;
