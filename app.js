const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
const config = require('./config');

app.use('/static', express.static('public'));

app.set('view engine', 'pug');


//create new twitter application that generates keys and 
//tokens to authenticate application -- look at tutorial in resources
const Twit = require('twit');

const user = new Twit(config);

app.get('/', (req, res) => {
	user.get('search/tweets', { q: 'banana since:2011-07-11', count: 100}, 
	function(err, data, response) {
  	var text = data.statuses[19].text;
  	var image = data.statuses[19].user.profile_image_url;

	res.render('index', {text, image});

}); 
});

app.listen(port, ()=> {
	console.log(`Server is listening on port ${port}`);
});