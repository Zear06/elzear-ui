/* eslint-disable no-bitwise */

function mod(int, n) {
  return ((int % n) + n) % n;
}

function hashModN(str, n) {
  let hash = 0;
  if (str.length === 0) return hash;
  for (let i = 0; i < str.length; i += 1) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash &= hash; // Convert to 32bit integer
  }
  return mod(hash, n);
}

function hashCode(str) {
  return str.split('').reduce((prevHash, currVal) =>
    ((prevHash << 5) - prevHash) + currVal.charCodeAt(0), 0);
}

function hash(str: string): number {
  return Math.abs(hashCode(str) / (2 ** 16)) % 1;
}

function hash2resp(nbr: number, nResp: number): number {
  return Math.floor(nbr * nResp);
}

type inputType = { hash: number, result: number };

const salt = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const samples: Array<inputType> = [
  '8110783157',
  '6481555542',
  '8207655230',
  '2142738575',
  '5819259283',
  '3496590086',
  '1319819371',
  '7921072564',
  '9660866157',
  '8511038612'
]
  .map(a => ({
    hash: hash(a + salt + a),
    result: hash2resp(hash(a + salt + hash(a) + salt + a + hash(`${a}js${a}dklf`)), 2)
  }));

export default samples;
export type { inputType };
