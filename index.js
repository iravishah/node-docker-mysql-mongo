const express = require('express');
const app = express();
const bodyParser = require('body-parser');
global.config = require('./lib/config')();
// const mongoose = require('./lib/mongo_connect').connect();
const routes = require('./routes/routes');
const mysqlConn = require('./lib/mysql_connect')
require('./models/bettles');

(function contruct() {
	connectMySql();
	configure();
	start();
})();

function connectMySql() {
	mysqlConn.connect(function(err, data) {
		if(!err && data) {
			global.sql_connection = data;
		} else {
			console.log('error while connecting to mysql')
			console.log(err.stack);
		}
	})
}

function configure() {
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  app.use(routes());
}

function start() {
  app.listen(config.port, () => console.log(`server started on ${config.port}`))
}

process.on('unhandledRejection', (err) => {
  console.log(`Unhandled Rejection ${err}` );
});