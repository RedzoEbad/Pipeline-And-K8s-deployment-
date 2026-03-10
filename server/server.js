const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const itemsRouter = require('./routes/items');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;
const MONGO =  'mongodb://mongo:27017/itemsdb';

mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Mongo connection error:', err));

app.use('/api/items', itemsRouter);

app.get('/', (req, res) => res.send({ ok: true }));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
