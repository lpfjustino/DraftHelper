// Variable imports
var express = require('express')
	,mongoose = require('mongoose')
	,app = express();

var path = require('path');

// Configuration
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));
app.use('/stats', express.static(__dirname + '/tools/crawler/stats'));

// Mongodb connection
mongoose.connect('mongodb://localhost:27017/draftHelper');

app.get('/', function(req, res) {
	res.send('Olá, mundo!');
});

app.get('/stats', function(req, res) {
	res.sendFile(path.join(__dirname, '/tools/crawler/stats', 'Aatrox_Jungle_CS.json'));
});

app.get('/stats/:champ/:role/:file', function(req, res) {
	var _champ = req.params.champ;
	var _role = req.params.role;
	var _file = req.params.file;
	var filePath = _champ.concat('_', _role, '_', _file, '.json')
	res.sendFile(path.join(__dirname, '/tools/crawler/stats', filePath));
});

app.listen(8080, function() {
	console.log('Server is running at localhost:8080');
})