const mysql = require('mysql');

module.exports = {
	connect: function(cb) {
		var connection = mysql.createConnection({
		   host     : config.mysql.host,
		   user     : config.mysql.username,
		   password : config.mysql.password,
		   database : config.mysql.database
		 });

		 connection.connect(function(err){
			if(!err) {
				console.log('Database connected');
			    return cb(null, connection);
			}
			cb(err);
		});
	}
}