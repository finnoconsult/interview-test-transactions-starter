import * as express from 'express';
import * as bodyParser from 'body-parser';
const cors = require('cors')
import { Health } from '@interview-homework-transaction-list/api-interfaces';
import { transactions, partners } from './data/db.json';
import { User, UserInterface } from './app/User';

const app = express();

const jsonParser = bodyParser.json();
app.use(cors({
  origin: true,
  credentials: true
}));
let user: UserInterface | null = null;
const started = new Date();

app.post('/api/login', jsonParser, (req, res) => {
  if (req?.body?.username && req?.body?.password) {
    user = new User(req.body.username, req.body.password);
    res.status(200);
    res.send({ token: user.token });
  } else {
    res.status(401);
    res.send({ error: 'not authorized' });
  }
});
app.post('/api/logout', jsonParser, (req, res) => {
  console.log('Request Type:', req);
  console.log('Request content:', req.body);
  user = null;
  res.status(200);
  res.send({ token: null });
});

app.get('/api/health', (req, res) => {
  res.send({
    status: 'OK',
    userCount: user ? 1 : 0,
    started,
  } as Health);
});

app.use('/api/banking', function (req, res, next) {
  const bearerToken = req.headers.authorization?.match(/^Bearer (.*)$/);
  if (!bearerToken?.[1] || user?.token !== bearerToken[1]) {
    res.status(403);
    res.send({ error: 'not authorized' });
    user = null;
  } else {
    next();
  }
});

app.get('/api/banking/transactions', (req, res) => {
  res.send(transactions);
});
app.get('/api/banking/partners', (req, res) => {
  res.send(partners);
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port + '/api');
});
server.on('error', console.error);
