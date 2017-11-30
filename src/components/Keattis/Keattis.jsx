import React from 'react';
import './Keattis.css';
import inputs from './hash';
import { buildHistory } from './logic';
import BinaryTree from './BinaryTree';
import QuantumTreeComponent from './QuantumTreeComponent';
import problemData from './problemData';
import InputComponent from './InputsComponent';

const history = buildHistory();

// const history = [];

function Keattis() {
  const Inputs = inputs.map(sample => (
    <span key={sample.hash}>
      {sample.hash}<span> - </span>
      <span style={{ backgroundColor: problemData.colors[sample.result] }}>{sample.result}</span>
      <br />
    </span>
  ));
  /* eslint-disable react/no-array-index-key */
  return (
    <div className='keattis'>
      <h2>Inputs</h2>
      <p className='samples'>
        {Inputs}
      </p>


      <h2>History</h2>

      <table className='history'>
        <tbody>
        {history.map((attmpt, key) => {
          return (
            <tr key={key} className='attempt'>
              <td className='left'>
                {key}
                {' - '}
                {
                  attmpt.testCasesResults.map((tcResult, k) => <span key={k}> {k}{tcResult ? 'o' : 'x'} </span>)
                }
              </td>

              <td className='right'>

                <div className='inputBars'>
                  <InputComponent
                    inputs={inputs.slice(0, attmpt.testCasesResults.length)}
                    colors={problemData.colors}
                  />
                </div>

                <div className='quantum-tree'>
                  <QuantumTreeComponent tree={attmpt.quantumTree} colors={problemData.colors} />
                </div>
                <div className='kattis-tree'>
                  <BinaryTree tree={attmpt.kattisTree} colors={problemData.colors} />
                </div>


                <div className='quantum-tree'>
                  {
                    attmpt.quantumTreePerTC.map(qt => (
                      <div className='quantum-tree-tc'>
                        <QuantumTreeComponent tree={qt} colors={problemData.colors} />
                      </div>
                    ))
                  }
                </div>
              </td>
            </tr>
          );
        })}
        </tbody>
      </table>
    </div>
  );
}

export default Keattis;
