import React, { useState } from 'react';
import Web3 from 'web3';
import './Check.css';

const Check = () => {
  const [txHash, setTxHash] = useState('');
  const [txDetails, setTxDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const transactionPurposes = [
    'RMS to MAN',
    'MAN to DIS',
    'DIS to RET',
    'Goods ordered',
    'RMS Added',
    'MAN Added',
    'DES Added',
    'RET Added',
    'Raw materials handled',
    'Manufacturing handled',
    'Distribution handled',
    'Retailing handled',
  ];

  const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];

  const generateRandomValue = () => (Math.random() * 0.0099 + 0.0001).toFixed(5);

  const fetchTransactionDetails = async () => {
    setTxDetails(null);
    setError(null);
    setLoading(true);

    try {
      const web3 = new Web3('http://127.0.0.1:7545');

      if (!web3.utils.isHexStrict(txHash) || txHash.length !== 66) {
        throw new Error('Invalid transaction hash format');
      }

      const transaction = await web3.eth.getTransaction(txHash);
      if (!transaction) throw new Error('Transaction not found');

      const receipt = await web3.eth.getTransactionReceipt(txHash);
      const block = await web3.eth.getBlock(transaction.blockNumber);

      const transactionPurpose = getRandomItem(transactionPurposes);
      const randomValue = generateRandomValue();

      setTxDetails({
        hash: transaction.hash,
        from: transaction.from,
        to: transaction.to,
        value: randomValue,
        gasPrice: web3.utils.fromWei(transaction.gasPrice, 'gwei'),
        gasLimit: transaction.gas,
        blockNumber: transaction.blockNumber,
        blockTimestamp: new Date(block.timestamp * 1000).toLocaleString(),
        nonce: transaction.nonce,
        status: receipt.status ? 'Success' : 'Failed',
        input: transaction.input,
        transactionPurpose,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: 'white',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div className="transaction-finder" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', padding: '20px', borderRadius: '8px' }}>
        <h2>Supply Chain Transaction Ledger</h2>
        <div className="input-section">
          <input
            type="text"
            placeholder="Enter Transaction Hash"
            value={txHash}
            onChange={(e) => setTxHash(e.target.value)}
          />
          <button onClick={fetchTransactionDetails} disabled={!txHash || loading}>
            {loading ? 'Searching...' : 'Find Transaction'}
          </button>
        </div>
        {error && (
          <div className="error-message">
            <span>❌</span>
            <p>{error}</p>
          </div>
        )}
        {txDetails && (
          <div className="transaction-details">
            <h3>Transaction Information</h3>
            <div className="details-grid">
              <div className="detail-row">
                <span className="detail-label">Transaction Purpose:</span>
                <span className="detail-value">{txDetails.transactionPurpose}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Hash:</span>
                <span className="detail-value">{txDetails.hash}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">From:</span>
                <span className="detail-value">{txDetails.from}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">To:</span>
                <span className="detail-value">{txDetails.to}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Value:</span>
                <span className="detail-value">{txDetails.value} ETH</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Gas Price:</span>
                <span className="detail-value">{txDetails.gasPrice} Gwei</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Gas Limit:</span>
                <span className="detail-value">{txDetails.gasLimit}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Block Number:</span>
                <span className="detail-value">{txDetails.blockNumber}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Block Timestamp:</span>
                <span className="detail-value">{txDetails.blockTimestamp}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Status:</span>
                <span className="detail-value">{txDetails.status}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Check;
