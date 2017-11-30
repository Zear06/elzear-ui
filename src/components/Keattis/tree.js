/* eslint-disable no-bitwise */

function mod(hash: number, n: number) {
  return ((hash % n) + n) % n;
}

type treeConstructor = boolean | Array<treeConstructor | Tree>;

class Tree {
  n: number;
  value: ?boolean;
  leftNode: ?Tree;
  rightNode: ?Tree;

  constructor(tC: treeConstructor, n: number) {
    this.n = n;

    if (typeof tC === 'boolean') {
      this.value = tC;
      this.leftNode = null;
      this.rightNode = null;
    } else {
      this.value = null;
      if (tC[0] instanceof Tree) {
        this.leftNode = tC[0];
      } else {
        this.leftNode = new Tree(tC[0], n + 1);
      }
      if (tC[1] instanceof Tree) {
        this.rightNode = tC[1];
      } else {
        this.rightNode = new Tree(tC[1], n + 1);
      }
    }
  }

  union(tree: Tree) {
    if (this.value !== null && tree.value !== null) {
      if (this.value !== tree.value) {
        return new Tree([true, false], this.n + 1);
      }
    }
    return this;
  }

  not(): Tree {
    if (this.value !== null) {
      return new Tree(!this.value, this.n);
    }
    if (this.leftNode && this.rightNode) {
      const left: Tree = this.leftNode;
      const right: Tree = this.rightNode;
      return new Tree([left.not(), right.not()], this.n + 1);
    }
    throw new Error('invalid tree');
  }


  pathsGiving(value: boolean) {
    if (this.value !== null) {
      return this.value === value;
    }
    if (this.leftNode && this.rightNode) {
      const left: Tree = this.leftNode;
      const right: Tree = this.rightNode;
      return [
        left.pathsGiving(value),
        right.pathsGiving(value)
      ];
    }
    throw new Error('invalid tree');
  }

  result(hash: number): boolean {
    if (this.value === true || this.value === false) {
      return this.value;
    }
    if (mod(hash, 2 ** this.n) >= (2 ** (this.n - 1)) && this.leftNode) {
      return this.leftNode.result(hash);
    }
    if (this.rightNode) {
      return this.rightNode.result(hash);
    }
    throw new Error('invalid tree');
  }
}

// function displayHashZone(tC: treeConstructor) {
//   return null;
// }

export default Tree;
export type { treeConstructor };
