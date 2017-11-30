import React from 'react';

type Props = {
  inputs: { hash: number, result: number },
  colors: Array<string>
};

function InputComponent({ inputs, colors }: Props) {
  return inputs.map((input, k) => (
    <div
      key={input.hash}
      className='inputBar'
      style={{ backgroundColor: colors[input.result], left: `${input.hash * 100}%` }}
    >
      {k}
    </div>
  ));
}

export default InputComponent;
