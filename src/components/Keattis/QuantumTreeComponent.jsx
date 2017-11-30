import React from 'react';
import QuantumTree from './QuantumTree';

type quantumTreeType = number | Array<quantumTreeType>;

type Props = {
  tree: QuantumTree,
  colors: Array<string>
};

function QuantumTreeComponent({ tree, colors }: Props) {
  if (tree.vals) {
    return (
      <div
        style={{ width: '100%' }}
        className='quantum tree leaf'
      >
        {tree.vals.length ?
          tree.vals.map((val, k, treevals) => (
            <div
              key={val}
              style={{ width: '100%', height: `${100 / treevals.length}%`, backgroundColor: colors[val] }}
            />
          ))
          : <div style={{ width: '100%', height: '100%', backgroundColor: 'black' }} />
        }
      </div>
    );
  }
  if (tree.children) {
    return (
      <div style={{ width: '100%' }} className='tree node'>
        <div style={{ width: '50%' }} className='float'>
          <QuantumTreeComponent tree={tree.children[0]} colors={colors} />
        </div>
        <div style={{ width: '50%' }} className='float'>
          <QuantumTreeComponent tree={tree.children[1]} colors={colors} />
        </div>
      </div>
    );
  }
  throw new Error('invalid tree');
}

export default QuantumTreeComponent;
