require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const authRouter = require('./routes/authorization/authorization-router');
const userRouter = require('./routes/user/user-router');
const forumRouter = require('./routes/forum/forum-router');
const { NODE_ENV } = require('./config');
const app = express();
const morganOp = (process.env.NODE_ENV === 'production') ? 'tiny' : 'common';

app.use(morgan(morganOp));
app.use(helmet());
app.use(cors());

app.get('/', (req, res)=>{
  res.send('cpsc-349');
});

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/forum', forumRouter);

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === 'production')
    response = { error: { message: 'server error' } };
  else 
    response = { message: error.message, error };
  res.status(500).json(response);
});

module.exports = app;