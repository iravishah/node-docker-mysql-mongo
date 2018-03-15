module.exports = () => {
	const express = require('express');
	const router = express.Router();
	const middleware = require('../middleware/middleware');

	router.get('/list',
		middleware.checkAdminKey,
		middleware.listBettlesPlaces
	);

	router.get('/count',
		middleware.checkAdminKey,
		middleware.countBattle
	);

	router.get('/search',
		middleware.checkAdminKey,
		middleware.searchBattle
	);

	router.all('*',
		middleware.unauthorized
	);
	return router;
}