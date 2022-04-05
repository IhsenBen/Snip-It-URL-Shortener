const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = process.env.PORT || 8000;
const HttpError = require('./models/error');
const usersRouter = require('./routes/users');
const linksRouter = require('./routes/links');

const app = express();

dotenv.config();

//hide some sensitive data from response headers
app.use(helmet());

app.use(cors());

app.use(bodyParser.json());

//manage allowed calls from client
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  next();
});

//---------Routes-----------
app.use('/api/user', usersRouter);
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
app.use('/api/link', linksRouter);
//---------End Routes---------

// throw 404 for non-existing routes
app.use((req, res, next) => {
  const error = new HttpError('Could not find this route', 404);
  throw error;
});

//Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log('📡connected to mongo 📡'))
  .catch((err) => console.log(err));

app.listen(port, () => console.log(`🌍 Server runing on port ${port} 🌍`));
