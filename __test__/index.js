const chai = require('chai');
const should = require('should');
const index = require('../index');
const request = require('request');
const baseUrl = 'http://localhost:7778'

describe('Middleware Unit Test', () => {
	describe('success scenarios', () => {
		it('should return location of all battle places', (done) => {
			let options = {
				'method': 'GET',
				'url': `${baseUrl}/list`,
				'headers': {
					'admin_key': config.admin_key
				}
			}
			request(options, (err, res, data) => {
				should.not.exists(err);
				should.exists(data);
				data = JSON.parse(data);
				data.should.have.properties(['places'])
				done()
			})
		})
		it('should return count of all battles', (done) => {
			let options = {
				'method': 'GET',
				'url': `${baseUrl}/count`,
				'headers': {
					'admin_key': config.admin_key
				}
			}
			request(options, (err, res, data) => {
				should.not.exists(err);
				should.exists(data);
				data = JSON.parse(data);
				data.should.have.properties(['battel_count'])
				done()
			})
		})
		it('should return search', (done) => {
			let options = {
				'method': 'GET',
				'url': `${baseUrl}/search`,
				'qs': {
					'major_death': 1,
					'battle_number': 2
				},
				'headers': {
					'admin_key': config.admin_key
				}
			}
			request(options, (err, res, data) => {
				should.not.exists(err);
				should.exists(data);
				data = JSON.parse(data);
				data.should.have.properties(['result'])
				done()
			})
		})
	});
	describe('faliure scenarios', () => {
		it('should return unauthorized', (done) => {
			let options = {
				'method': 'GET',
				'url': `${baseUrl}/list`,
				'headers': {
					'admin_key': 'dummy'
				}
			}
			request(options, (err, res, data) => {
				should.not.exists(err);
				should.exists(data);
				data = JSON.parse(data);
				data.should.have.properties(['error'])
				done()
			})
		})
	});
});