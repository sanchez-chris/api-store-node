const cors = require('cors');
const express = require('express');
const routerApi = require('./routes');
const { errorHandler, logErrors, boomErrorHandler } = require('./middlewares/error.handle');
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors()); // all origins accepted
/*
const whitelist = ['http://localhost:8080','124.123.543.12', '127.0.0.1:3000']
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) {
      callback(null, true);
      }else{
      callback(new Error('ip not allowed'));
    }
  }
}
app.use(cors(options)); // just whitelist origins
*/
app.get('/api', (req, res) => {
  res.send('listening to ' + port);
});

app.listen(port, () => {
  console.log('listening to ' + port);
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

module.exports = app;
