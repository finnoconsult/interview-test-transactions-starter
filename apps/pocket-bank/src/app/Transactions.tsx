import React, {useEffect, useState} from 'react';
import {getTransactions} from '../util/api';
import Transaction from './Transaction';
import {TransactionDetailsType, TransactionType} from '../util/interfaces';
import * as _ from 'lodash';
import {destroySession, groupTransactionsByDate, showNotification} from '../util/util';
import Layout from "./Layout";

interface TransactionsProps {
  destroySession(): void;
}

const Transactions = (props: TransactionsProps) => {
  const [transactions, setTransactions] = useState<
    Record<string, TransactionDetailsType>
  >({});

  const setFinalTransactions = (grouped: Record<string, TransactionType[]>) => {
    const transformedTransactions: Record<string, TransactionDetailsType> = {};
    Object.entries(grouped).forEach(([date, transactions]) => {
      transformedTransactions[date] = {
        transactions: transactions,
        transactionAmount: _.round(
          _.sumBy(transactions, (trans) => trans.amount),
          2
        ),
      } as TransactionDetailsType;
    });
    setTransactions(transformedTransactions);
  };

  const handleTransactionFetching = () => {
    getTransactions()
      .then(({data}) => {
        const cData = [...data].sort((a, b) => (a.date > b.date ? 0 : 1));
        cData.forEach((cd, index) => (cd.id = index + 1000));
        const grouped = groupTransactionsByDate(cData);
        setFinalTransactions(grouped);
      })
      .catch(() =>
        showNotification(
          'Something happened during transaction fetch, please try it later!'
        )
      );
  };

  useEffect(() => {
    handleTransactionFetching();
  }, []);

  return (
    <Layout buttonBackground={"red"} buttonClick={destroySession} backgroundColor={"bg-info"} buttonTitle={"Logout"}>
      <div
        style={{
          background: 'lightgray',
          color: 'black',
          height: '50vh',
          overflowY: 'scroll',
        }}
      >
        {Object.entries(transactions).map(
          ([date, transactionDetails]) => (
            <>
              <div
                style={{
                  position: 'sticky',
                  top: 0,
                  background: 'gray',
                }}
              >
                {date} ({transactionDetails.transactionAmount})
              </div>
              {transactionDetails.transactions.map(
                (trans: TransactionType) => (
                  <Transaction transaction={trans}/>
                )
              )}
            </>
          )
        )}
      </div>
    </Layout>
  );
};
export default Transactions;
