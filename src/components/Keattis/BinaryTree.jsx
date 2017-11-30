import React from 'react';
import KattisTree from './KattisTree';

type binaryTreeType = boolean | Array<binaryTreeType>;

type Props = {
  tree: KattisTree,
  colors: Array<string>
};

function BinaryTree({ tree, colors }: Props) {
  if (tree && typeof tree.val === 'number') {
    return (
      <div
        style={{ width: '100%', backgroundColor: colors[tree.val] }}
        className={`tree leaf value${tree.val}`}
      />
    );
  }
  return (
    <div style={{ width: '100%' }} className='tree node'>
      <div style={{ width: '50%' }} className='float'>
        <BinaryTree tree={tree.children[0]} colors={colors} />
      </div>
      <div style={{ width: '50%' }} className='float'>
        <BinaryTree tree={tree.children[1]} colors={colors} />
      </div>
    </div>
  );
}

export default BinaryTree;
