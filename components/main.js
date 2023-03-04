import { useState } from 'react';
const Moralis = require('moralis').default;
const { EvmChain } = require('@moralisweb3/common-evm-utils');
import Select from 'react-select';
import styles from '../styles/Home.module.css';

export default function Header() {
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState('');
  const [chainValue, setChainValue] = useState('');
  let address;

  // Dropdown options
  const valueOptions = [
    { value: 'eth', label: 'Ethereum' },
    { value: 'goerli', label: 'Goerli' },
    { value: 'polygon', label: 'Polygon' },
    { value: 'avalanche', label: 'Avalanche' },
  ];

  const customStyles = {
    option: (provided) => ({
      ...provided,
      color: '#000000',
      backgroundColor: '#ffffff',
    }),
  };

  // Dropdown choice handler
  const changeHandler = (chainValue) => {
    setChainValue(chainValue);
  };

  // Submit button handler
  const handleSubmit = async () => {
    address = document.querySelector('#contractAddress').value;
    const chain = EvmChain.ETHEREUM;

    await Moralis.start({
      apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY,
    });

    const response = await Moralis.EvmApi.token.getTokenPrice({
      address,
      chain,
    });

    setResult(`$ ${response.toJSON().usdPrice}`);
    setShowResult(true);
    setChainValue('');
    document.querySelector('#contractAddress').value = '';
  };

  return (
    <section className={styles.main}>
      <form className={styles.getTokenForm}>
        <label className={styles.label}>Add ERC20 Contract Address</label>
        <input className={styles.contractAddress} />
        <label className={styles.label}>Select Chain</label>
        <Select
          styles={customStyles}
          options={valueOptions}
          value={chainValue}
          instanceId="long-value-select"
          onChange={changeHandler}
        />
      </form>
      <button className={styles.form_btn} onClick={console.log('Submit')}>
        Submit
      </button>
      <section className={styles.result}>Result</section>
    </section>
  );
}
