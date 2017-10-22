import React, { Component } from 'react';
import * as _ from 'lodash';
import type { OptionProps } from 'react-apollo';
import { graphql } from 'react-apollo';
import { Button, List, Input } from 'semantic-ui-react';
import ADD from '../../../graphql/PollAddPreferencesMutate.graphql';

type ranking = Array<Array<string>>;

type Props = {
  candidates: Array<string>,
  myPrefs?: ranking,
  pollKey: string
} & OptionProps;
type State = {
  alternativesScores: Array<{ alternative: string, text: string, score: ?number }>
};

function alternativesScores2ranking(alternativesScores): ranking {
  const scores = ((_.uniq(
    alternativesScores
      .map(x => x.score)
      .filter(_.isNumber)
  ).sort((a: number, b: number) => a - b): Array<any>): Array<number>);
  return scores.map(
    score => alternativesScores
      .filter(x => x.score === score)
      .map(x => x.alternative)
  );
}

@graphql(ADD)
class AddPrefs extends Component<Props, State> {
  static defaultProps = {
    myPrefs: []
  };

  constructor(props: Props) {
    super(props);
    const alternativesScores = props.candidates.map(alternative => ({ alternative, score: null, text: '' }));
    props.myPrefs.forEach((rank, key) => rank.forEach(
      (alternative) => {
        const score = (key + 1) * 10;
        const match = _.find(alternativesScores, { alternative });
        if (match) {
          match.score = score;
          match.text = String(score);
        }
      }
    ));

    this.state = {
      alternativesScores
    };
  }

  submit = () => {
    const { pollKey } = this.props;
    const prefs = JSON.stringify(
      alternativesScores2ranking(this.state.alternativesScores)
    );

    this.props.mutate({
      variables: { pollKey, ranking: prefs },
      //   // optimisticResponse: {
      //   //   createdAt: new Date(),
      //   //   text,
      //   //   // _from: "users/1328112",
      //   //   _to: targetId,
      //   //   __typename: 'Comment'
      //   // },
      update:
        (store, resp) => {
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

  _inputOnChange(alternative: string, text: string) {
    this.setState(({ alternativesScores }) => ({
      alternativesScores: alternativesScores.map(
        alternativeScore => (alternativeScore.alternative === alternative ? ({
          ...alternativeScore,
          text
        }) : alternativeScore)
      )
    }));
  }

  _onBlur(alternative: string) {
    this.setState(({ alternativesScores }) => ({
      alternativesScores: alternativesScores.map(
        (alternativeScore) => {
          const score = Number(alternativeScore.text.trim()) || null;
          return (alternativeScore.alternative === alternative ? ({
            ...alternativeScore,
            score,
            text: _.isNumber(score) ? String(score) : ''
          }) : alternativeScore);
        }
      )
    }));
  }

  render() {
    const alternatives = this.props.candidates.map((alternative) => {
      const altScore = _.find(this.state.alternativesScores, { alternative });
      const inputValue = altScore ? altScore.text : '';
      return (
        <List.Item key={alternative}>
          <Input
            value={inputValue}
            onChange={e => this._inputOnChange(alternative, e.target.value)}
            onBlur={() => this._onBlur(alternative)}
          />
          {alternative}
        </List.Item>
      );
    });

    /* eslint-disable react/no-array-index-key */
    const r = alternativesScores2ranking(this.state.alternativesScores)
      .map((rank: Array<string>, key) => (
        <List.Item key={key}>
          <List.Content>
            {rank.join(',')}
          </List.Content>
        </List.Item>
      ));
    return (
      <div>

        Give a rank (lowest number = most liked)
        to the alternatives that you want to include.
        All alternatives without rank set will be placed last.

        <List className='alternatives'>
          {alternatives}
        </List>
        <List className='pref'>
          {r}
        </List>
        <Button onClick={this.submit}>Add Pref</Button>
      </div>
    );
  }
}

export default AddPrefs;
