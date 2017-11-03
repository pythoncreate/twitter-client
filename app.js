const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
const config = require('./config');

app.use('/static', express.static('public'));

app.set('view engine', 'pug');

var friends = [];
var tweets = [];


//create new twitter application that generates keys and 
//tokens to authenticate application -- look at tutorial in resources
const Twit = require('twit');

const user = new Twit(config);

user.get('statuses/user_timeline', { screen_name: 'crsbos', count: 5},
	function(e, data, result) {
	tweets = data;

}); 

user.get('friends/list', { screen_name: 'crsbos', count: 5},
	function(e, data, result) {
	friends = data.users;

}); 

user.get('direct_messages', { screen_name: 'crsbos', count: 5},
	function(e,data,result) {
	dms = data;
	console.log(dms);
});

app.use('/', (req, res) => {
	res.render('index', {
		tweets: tweets,
		friends: friends,
		dms: dms
	});
});




app.listen(port, ()=> {
	console.log(`Server is listening on port ${port}`);
});