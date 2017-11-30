import * as _ from 'lodash';
import KattisTree from './KattisTree';
import problemData from './problemData';

function arrayRotate(_arr, reverse) {
  const arr = _arr.slice();
  if (reverse) {
    arr.unshift(arr.pop());
  }
  else {
    arr.push(arr.shift());
  }
  return arr;
}

function arrayRotateN(_arr, reverse, n) {
  let arr = _arr.slice();
  for (let i = 0; i < n; i += 1) {
    arr = arrayRotate(arr, reverse);
  }
  return arr;
}

type arrayQuantumType = Array<arrayQuantumType | number> | Array<number>;

class QuantumTree {
  n: number;
  vals: ?Array<number> = null;
  children: ?Array<QuantumTree> = null;

  constructor(n: number, children: ?Array<QuantumTree>, vals: ?Array<number>) {
    this.n = n;
    if (children && !vals) {
      this.children = children;
    } else if (!children && vals) {
      this.vals = vals;
    } else {
      throw new Error('invalid tree init');
    }
  }

  inter(t: QuantumTree): QuantumTree {
    let newValues = null;
    let newChildren = null;
    if (this.children && t.children) {
      newChildren = this.children.map((child, k) => child.inter(t.children[k]));
    } else if (this.children) {
      newChildren = this.children;
      // newChildren = this.children.map(child =>
      //   child.inter(new QuantumTree(this.n + 1, null, t.vals)));
    } else if (t.children) {
      newChildren = t.children;
      // newChildren = t.children.map(child =>
      //   child.inter(new QuantumTree(this.n + 1, null, this.vals)));
    } else {
      newValues = _.intersection(this.vals, t.vals);
    }
    return new QuantumTree(this.n, newChildren, newValues);
  }

  empty2All(): QuantumTree {
    if (this.children) {
      const kattisTreeChildren = this.children.map(t => t.empty2All());
      return new QuantumTree(this.n, kattisTreeChildren);
    }
    if (this.vals) {
      const v: Array<number> = this.vals;
      if (v.length > 0) {
        return new QuantumTree(this.n, null, v);
      }
      return new QuantumTree(this.n, null, problemData.values);
    }
    throw new Error('invalid');
  }

  union(t: QuantumTree): QuantumTree {
    let newValues = null;
    let newChildren = null;
    if (this.children && t.children) {
      newChildren = this.children.map((child, k) => child.union(t.children[k]));
    } else if (this.children) {
      newChildren = this.children;
    } else if (t.children) {
      newChildren = t.children;
    } else {
      newValues = _.union(this.vals, t.vals);
    }
    return new QuantumTree(this.n, newChildren, newValues);
  }

  depthStop(): ?number {
    if (this.children) {
      return this.children.map(child => child.depthStop())
        .reduce((a, b) => {
          if (a === null) {
            return b;
          }
          if (b === null) {
            return a;
          }
          return Math.min(a, b);
        });
    } else if (this.vals) {
      // console.log('this.vals', this.vals);

      return (this.vals.length > 0) ? null : this.n;
    }
    throw new Error('err');
  }

  grow(depthStop: number): { qt: QuantumTree, hasGrown: boolean } {
    if (this.n > depthStop) {
      return {
        qt: new QuantumTree(this.n, this.children, this.vals),
        hasGrown: false
      };
    }
    if (this.n === depthStop && this.vals && this.vals.length < 1) {
      const newChildren = problemData.values
        .map((child, k) => (
          new QuantumTree(this.n + 1, null, arrayRotateN(problemData.values, true, k))
        ));
      return {
        qt: new QuantumTree(this.n, newChildren),
        hasGrown: true
      };
    }
    if (this.vals) {
      return {
        qt: new QuantumTree(this.n, null, this.vals),
        hasGrown: false
      };
    }
    if (this.children) {
      const newChildren = [];
      let hasGrown = false;
      this.children.forEach((child) => {
        let qt;
        if (hasGrown) {
          qt = child;
        } else {
          const p = child.grow(depthStop);
          qt = p.qt;
          hasGrown = p.hasGrown;
        }
        newChildren.push(qt);
      });
      return {
        qt: new QuantumTree(this.n, newChildren),
        hasGrown
      };
    }
    throw new Error('impossible');
  }

  getAKattisTree(): KattisTree {
    if (this.children) {
      const kattisTreeChildren = this.children.map(t => t.getAKattisTree());
      return new KattisTree(this.n, kattisTreeChildren);
    }
    if (this.vals) {
      const v: Array<number> = this.vals;
      if (v.length > 0) {
        return new KattisTree(this.n, null, v[0]);
      }
    }
    return new KattisTree(this.n, null, problemData.values[0]);
    // throw new Error('impossible');
  }

  getArray(): arrayQuantumType {
    if (this.children) {
      return this.children.map(t => t.getArray());
    } else if (this.vals) {
      return this.vals;
    }
    throw new Error('impossible');
  }

  not(): QuantumTree {
    if (this.children) {
      return new QuantumTree(this.n, this.children.map(t => t.not()));
    } else if (this.vals) {
      return new QuantumTree(this.n, null, _.difference(problemData.values, this.vals));
    }
    throw new Error('impossible');
  }
}


export default QuantumTree;
