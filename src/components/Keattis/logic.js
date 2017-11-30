import * as _ from 'lodash';
import inputs from './hash';
import type { inputType } from './hash';
import KattisTree from './KattisTree';
import problemData from './problemData';
import QuantumTree from './QuantumTree';


type binaryTreeType = boolean | Array<binaryTreeType>;
type binaryTreeTypeNullable = ?(boolean | Array<binaryTreeTypeNullable>);

//
type hashtreeByTCtype = // Array< // id = attempt n°
  Array< // id = TC n°
    binaryTreeType>;

type attemptData = {
  testCasesResults: Array<boolean>,
  quantumTree: QuantumTree,
  kattisTree: KattisTree,
  hashtreeByTC?: hashtreeByTCtype
};

type historyType = Array<attemptData>;

function isCorrect(tree: KattisTree, input: inputType) {
  return tree.result(input.hash) === input.result;
}

let quantumTree = new QuantumTree(0, null, [0, 1]);

function buildHistory(): historyType {
  const history: historyType = [];
  const final = false;
  let attempt = 0;

  let htc = 0;
  while (attempt < problemData.maxAttempt && !final) {
    const testCasesResults: Array<boolean> = [];
    let isCorrectV = true;

    const kattisTree = quantumTree.getAKattisTree();
    for (let i = 0; i < inputs.length && isCorrectV; i += 1) {
      isCorrectV = isCorrect(kattisTree, inputs[i]);
      testCasesResults[i] = isCorrectV;
      if (i > htc) htc = i;
    }
    history[attempt] = {
      quantumTree: _.cloneDeep(quantumTree),
      kattisTree,
      testCasesResults,
    };

    const quantumTreesPerTC = _.range(htc + 1)
      .map(tc => history
        .filter(atpt => atpt.testCasesResults.length > tc)
        .map((atpt) => {
          const quant = atpt.kattisTree.toQuantumTree();
          const r = atpt.testCasesResults[tc] ? quant : quant.not();
          return r;
        }));

    const quantumTreePerTC = quantumTreesPerTC
      .map(qTrees => qTrees.reduce((a, b) => a.inter(b)))
      .map(qTree => qTree.empty2All());
    history[attempt].quantumTreePerTC = quantumTreePerTC;


    console.log('quantumTreePerTC', quantumTreePerTC.map(q => q.getArray().toString()));

    quantumTree = quantumTreePerTC
      .reduce((a: QuantumTree, b: QuantumTree) => a.inter(b));

    console.log('quantumTree', quantumTree.getArray().toString());

    const depthStop = quantumTree.depthStop();
    console.log('quantumTree', quantumTree);

    console.log('depthStop', depthStop);

    if (depthStop !== null) {
      quantumTree = quantumTree.grow(depthStop).qt;
    }

    attempt += 1;
  }
  return history;
}

export { buildHistory };
export type { historyType };
