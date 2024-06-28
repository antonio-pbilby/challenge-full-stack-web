import express from 'express';
import 'dotenv';
import { config } from './config';

const app = express();

app.get('/', (req, res) => {
  res.status(200).send('ok');
});

app.listen(config.serverPort, () => {
  console.log(`listening on port ${config.serverPort}`);
});