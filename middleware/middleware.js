const mongoose = require('mongoose');
const Battle = mongoose.model('Battle');
const util = require('util');

function checkAdminKey(req, res, next) {
	if(req.headers.admin_key !== config.admin_key) {
		return res.status(401).json({error: 'Unauthorized'})
	}
	next();
}

function listBettlesPlaces(req, res, next) {
	sql_connection.query('SELECT location from battles', (err, result) => {
		if(err) {
			return res.status(400).json({error: 'error while fetching list'});
		}
		if(!result || !result.length) {
			return res.status(400).json({error: 'no records found'});	
		}
		res.status(200).json({'places': result});
	})
}

function countBattle(req, res, next) {
	sql_connection.query('SELECT count(*) from battles', (err, count) => {
		if(err) {
			return res.status(400).json({error: 'error while fetching count'});	
		}
		res.status(200).json({'battel_count': count[0]['count(*)']});
	})
}

function searchBattle(req, res, next) {
	let searchQuery = req.query || {};
	let keys = Object.keys(searchQuery);
	let q = 'SELECT * from battles';
	let newQ = 'SELECT * from battles WHERE';
	if(keys && keys.length) {
		keys.forEach(function(key, index){
			if(index === 0) {
				q += ' WHERE ' + key + ' = ' + searchQuery[key]
			} else {
				q += ' AND ' + key + ' = ' + searchQuery[key]
			}
		})
	}
	sql_connection.query(q, (err, result) => {
		if(err) {
			return res.status(400).json({error: 'error while fetching count'});	
		}
		res.status(200).json({'result': result});
	});
}

// API calls using mongodb

/*
function listBettlesPlaces(req, res, next) {
	let query = Battle.find({}, {location: 1});
	query.select('location -_id');
	query.lean().exec((err, result) => {
		if(err) {
			return res.status(400).json({error: 'error while fetching list'});
		}
		if(!result || !result.length) {
			return res.status(400).json({error: 'no records found'});	
		}
		res.status(200).json({'places': result});
	})
}

function countBattle(req, res, next) {
	let query = Battle.count();
	query.exec((err, count) => {
		if(err) {
			return res.status(400).json({error: 'error while fetching count'});	
		}
		res.status(200).json({'battel_count': count});
	})
}

function searchBattle(req, res, next) {
	let searchQuery = req.query || {};
	let query = Battle.find(searchQuery);
	query.exec((err, result) => {
		if(err) {
			return res.status(400).json({error: 'error while fetching result'});	
		}
		res.status(200).json({'result': result});
	})
}
*/

function unauthorized (req, res) {
	res.status(401).json({'error': 'Invalid endpoint'});
}

module.exports = {
	checkAdminKey,
	listBettlesPlaces,
	unauthorized,
	countBattle,
	searchBattle
}