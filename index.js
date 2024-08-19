const cors = require('cors');
const express = require('express');
const v1CategoriesRouter = require("./v1/routes/categories.router");
const v1ProductsRouter = require("./v1/routes/products.router");
const v1UsersRouter = require("./v1/routes/users.router");
const { swaggerDocs: V1SwaggerDocs } = require("./v1/swagger");
const routerApi = require('./v1/routes');
const { errorHandler, logErrors, boomErrorHandler } = require('./middlewares/error.handle');

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use("/api/v1/categories", v1CategoriesRouter);
app.use("/api/v1/products", v1ProductsRouter);
app.use("/api/v1/users", v1UsersRouter);
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
  V1SwaggerDocs(app, port);
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

module.exports = app;





