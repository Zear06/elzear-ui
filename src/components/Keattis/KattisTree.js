

/* eslint-disable no-bitwise */

import QuantumTree from './QuantumTree';

function mod(hash: number, n: number) {
  return ((hash % n) + n) % n;
}

const dim = 2;

type arrayQuantumType = Array<arrayQuantumType | number> | Array<number>;
type KattisTreeType = number | arrayQuantumType;
type treeBool = boolean | Array<treeBool>;

class KattisTree {
  n: number;
  val: ?number = null;
  children: Array<KattisTree> = null;

  constructor(n: number, children: ?Array<KattisTree>, val: ?number) {
    this.n = n;
    if (children && !val) {
      this.children = children;
    } else if (!children && val !== null) {
      this.val = val;
    } else {
      throw new Error('invalid tree init');
    }
  }

  result(hash: number): number {
    if (this.val !== null && this.val !== undefined) {
      return this.val;
    } else if (this.children) {
      const k = Math.floor(hash * this.children.length);
      const newHash = (hash * this.children.length) - k;
      return this.children[k].result(newHash);
    }
    throw new Error('impossible');
  }

  toQuantumTree() : QuantumTree {
    if (this.children) {
      return new QuantumTree(this.n, this.children.map(child => child.toQuantumTree()));
    }
    if (this.val !== null) {
      return new QuantumTree(this.n, null, [this.val]);
    }
    throw new Error('invalid');
  }

  getArray() : arrayQuantumType {
    if (this.children) {
      return this.children.map(child => child.getArray());
    }
    return this.val;
  }
}


export default KattisTree;
export type { KattisTreeType };

// function displayHashZone(tC: treeConstructor) {
//   return null;
// }
