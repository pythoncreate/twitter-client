const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
const config = require('./config');

app.use('/static', express.static('public'));

app.set('view engine', 'pug');

var friends = [];
var tweets = [];
var screen_name = [];


//create new twitter application that generates keys and 
//tokens to authenticate application -- look at tutorial in resources
const Twit = require('twit');

const user = new Twit(config);

user.get('account/verify_credentials', { skip_status: true })
  .catch(function (err) {
    console.log('caught error', err.stack)
  })
  .then(function (result) {
    // `result` is an Object with keys "data" and "resp". 
    // `data` and `resp` are the same objects as the ones passed 
    // to the callback. 
    // See https://github.com/ttezel/twit#tgetpath-params-callback 
    // for details. 
 
    var screen_name = result.data.screen_name;
  })

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