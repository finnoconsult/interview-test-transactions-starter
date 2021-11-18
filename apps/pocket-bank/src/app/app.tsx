import React, { useEffect, useState } from 'react';
import { Health } from '@interview-homework-transaction-list/api-interfaces';
import Styled from '@emotion/styled';

const WelcomeStyles = Styled.div`
  display: flex;
  width: 100%;
  background-color: rgba(0, 189, 89, 1);
  padding: 10px;
  background-image: url();

  h1 {
    margin: auto;
  }
  img {
    position: absolute;
    top: 16px;
    let: 20px;
  }
`;

const Welcome = () => (
  <WelcomeStyles>
    <img src="./assets/logo.svg" alt="Finno" width="180px" />
    <h1>Welcome to pocket-bank exercise!</h1>
  </WelcomeStyles>
);

const Instructions = () => (
  <div>
    <h3>Your tasks are:</h3>
    <ul>
      <li>
        Login Page
        <ul>
          <li>Create a Login page layout</li>
          <li>Login form shall have username and password</li>
          <li>
            Post form data to endpoint <u>/api/login</u>
          </li>
          <li>Store authentication (JWT) data from response</li>
        </ul>
      </li>
      <li>
        Transaction list page
        <ul>
          <li>Create page layout</li>
          <li>
            Retrieve transactions data from the server from{' '}
            <u>/api/banking/transaction</u> endpoint
            <ul>
              Help of <b>functional programming on Arrays</b>:
              <li>Sort list by date descending</li>
              <li>
                generate and add unique id for all items (range 1000-9999),
                based on order
              </li>
              <li>
                format nicely expenses with{' '}
                <b style={{ color: '#e00000' }}>red</b> color, income as{' '}
                <b style={{ color: 'green' }}>green</b>
              </li>
              <li>
                aggregate sum of transaction amounts weekly(or monthly) based on
                date (display, total sum, expense and income separately)
              </li>
            </ul>
          </li>
          <li>
            Create list render component
            <ul>
              <li>
                Layout & behavior to be followed:
                <a
                  href="https://github.com/finnoconsult/interview-test-transactions/blob/master/transaction-list-sample.mov"
                  target="_blank"
                  rel="noreferrer"
                >
                  example
                </a>
              </li>
              <li>
                Apply weekly headers to transactions, and enlist all belonging
                transactions underneath{' '}
              </li>
              <li>
                Weekly headers shall be sticky on scroll, see{' '}
                <a
                  href="https://github.com/finnoconsult/interview-test-transactions/blob/master/transaction-list-sample.mov"
                  target="_blank"
                  rel="noreferrer"
                >
                  see video for reference
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
    <a
      href="https://github.com/finnoconsult/interview-test-transactions/blob/master/README.md"
      target="_blank"
      rel="noreferrer"
    >
      Further info and instructions
    </a>
  </div>
);

export const App = () => {
  const [health, setHealth] = useState<Health>({
    status: 'pending...',
    userCount: -1,
    started: null,
  });

  useEffect(() => {
    // 💡 NOTE: window.fetch is deprecated, it's expected to be replaced by a proper networking solution
    fetch('/api/health')
      .then((r) => r.json())
      .then(setHealth);
  }, []);

  return (
    <div>
      <Welcome />

      <h3>
        Server status: {health.status}
        {health.started && (
          <small>
            , running since: {new Date(health.started).toString().substr(0, 28)}
          </small>
        )}
      </h3>

      <Instructions />
    </div>
  );
};

export default App;
