import React from 'react';
import { List } from 'semantic-ui-react';
import AddCandidates from './AddCandidates';

type Props = {
  candidates: Array<string>,
  pollKey: string
};

function Candidates(props: Props) {
  const r = props.candidates.map(candidate => (
    <List.Item key={candidate}>
      <List.Content>
        {candidate}
      </List.Content>
    </List.Item>
  ));
  return (
    <div>
      <List className='candidates'>
        {r.length ? r : 'Nothing'}
      </List>
      <AddCandidates candidates={props.candidates} pollKey={props.pollKey} />
    </div>
  );
}

export default Candidates;
