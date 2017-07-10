var express = require('express'),
	,mongoose = require('mongoose'),
	,app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));

mongoose.connect('http://localhost:27017/draftHelper')

app.get('/', function(req, res) {
	res.send('Olá, mundo!');
});

app.listen(8080, function() {
	console.log('Server is running at localhost:8080');
})