import React from 'react';
import { TransactionProps } from '../util/interfaces';

const Transaction = ({ transaction }: TransactionProps) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: transaction.amount < 0 ? 'end' : '',
        paddingBottom: '1rem',
      }}
    >
      <div
        style={{
          borderRadius: '30px',
          border: 'solid #E9E9E9',
          width: 'fit-content',
          background: 'white',
          padding: '1rem',
        }}
      >
        <span
          style={{
            color: transaction?.amount > 0 ? 'green' : 'black',
            fontWeight: 'bold',
          }}>{transaction?.amount}</span>- {transaction?.title}
      </div>
    </div>
  );
};

export default Transaction;
