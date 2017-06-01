var express = require('express');
var router = express.Router();
var request = require('request');
var config = require ('../config/config')
var apiKey = 'fec8b5ab27b292a68294261bb21b04a5';


const apiBaseUrl = 'http://api.themoviedb.org/3';
const nowPlayingUrl = apiBaseUrl + '/movie/now_playing?api_key='+apiKey;
const imageBaseUrl = 'http://image.tmdb.org/t/p/w300';

/* GET home page. */
router.get('/', function(req, res, next) {
	request.get(nowPlayingUrl,(error, response, movieData)=>{
		var movieData = JSON.parse(movieData);
		//calling res.render in request callback 
		res.render('index', { 
			movieData: movieData.results,
			imageBaseUrl: imageBaseUrl
		 });

	});

 
});

// router.get('/search', (req, res)=>{
// 	res.send("The get search page")
// })

router.post('/search', (req, res)=>{
	// req.body is available bc of the body parser module
	// bodyparser module installed when you created the express app
	// req.body is where POSTED data will live. 
	console.log(req.body);
	// res.json(req.body);
	//will hold whatever the user submitted 
	var termUserSearchedFor = req.body.searchString
	// res.send("The post search page")
	var searchUrl = apiBaseUrl + '/search/movie?query='+termUserSearchedFor+'&api_key='+config.apiKey;
	//passing variable along
	request.get(searchUrl,(error, response, movieData)=>{
		res.json(JSON.parse(movieData));

	});
});

module.exports = router;
