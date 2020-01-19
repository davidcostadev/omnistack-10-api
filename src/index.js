const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const routers = require('./routers');

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());
app.use(routers);

app.get('/', (req, res) => {
  res.json({
    hello: 'world',
  });
});

app.listen(3000, () => console.log('Server started on 3000 port.'));
