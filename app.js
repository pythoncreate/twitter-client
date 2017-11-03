const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
const config = require('./config');

app.use('/static', express.static('public'));

app.set('view engine', 'pug');

var friends = [];
var tweets = [];
var screen_name = [];
var user_data = [];


//create new twitter application that generates keys and 
//tokens to authenticate application -- look at tutorial in resources
const Twit = require('twit');

const user = new Twit(config);

user.get('account/verify_credentials', { skip_status: true },
 	function (e, data, result) {
    // `result` is an Object with keys "data" and "resp". 
    // `data` and `resp` are the same objects as the ones passed 
    // to the callback. 
    // See https://github.com/ttezel/twit#tgetpath-params-callback 
    // for details. 
 	user_data = data;
    screen_name = data.screen_name;
    console.log(user_data);
});

user.get('statuses/user_timeline', { screen_name: screen_name, count: 5},
	function(e, data, result) {
	tweets = data;

}); 

user.get('friends/list', { screen_name: screen_name, count: 5},
	function(e, data, result) {
	friends = data.users;

}); 

user.get('direct_messages', { screen_name: screen_name, count: 5},
	function(e,data,result) {
	dms = data;
});

app.use('/', (req, res) => {
	res.render('index', {
		tweets: tweets,
		friends: friends,
		dms: dms,
		screen_name: screen_name,
		user_data: user_data
	});
});




app.listen(port, ()=> {
	console.log(`Server is listening on port ${port}`);
});