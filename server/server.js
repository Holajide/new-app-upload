let express = require('express');
let app = express();

let bodyParser = require('body-parser');
let backendPort = 8084;

let mock = {
 	userData : require('./mock/userData'),
	feedData : require('./mock/feedData')
};

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Controll-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'POST,HEAD,OPTIONS,GET,PUT');
    res.header(
        'Access-Control-Allow-Headers',
        'Access-Control-Allow-Headers, Origin,Accept, X-Requested-with, Content-Type, Access-Control-Request-Method'
    );
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

app.post('/login', function (req, res, next) {
    let Data = JSON.parser(res.userData);
    let username = data.username;
    let password = data.password;
    
    if(username === 'testuser'  && password === 'testpassword') {
        return res.status(200).json(mock.userData);
    } else {
        return res.status(400).send('{"error":{"Bad request wrong username and password "}}');
    }
});

app.post('/feed', function(req, res, next) {
    let data = JSON.parse(req.body);
    let token = data.token;
    let user_id = data.user_id;

    if(token & user_id === '1' ){
        return res.status(200).json(mock.feedData);
    } else {
        return res.status(400).send('{"error":{"text":"No Access "}}');
    }
});

app.listen(backendPort, function() {
    console.log('Express server listening on port ' + backendPort);
});