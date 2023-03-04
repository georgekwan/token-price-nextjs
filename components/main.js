import { useState } from 'react';
const Moralis = require('moralis').default;
const { EvmChain } = require('@moralisweb3/common-evm-utils');
import Select from 'react-select';
import styles from '../styles/Home.module.css';

export default function Header() {
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState('');
  const [chainValue, setChainValue] = useState('');

  return (
    <section>
      <form>
        <label>Add ERC20 Contract Address</label>
        <input />
        <label>Select Chain</label>
      </form>
      <button onClick={console.log('Submit')}>Submit</button>
      <section>Result</section>
    </section>
  );
}
