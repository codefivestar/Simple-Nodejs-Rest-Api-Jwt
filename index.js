const express    = require('express'),
      bodyParser = require('body-parser'),
      jwt        = require('jsonwebtoken'),
      config     = require('./configs/config'),
      app        = express(); 

const checkAuth = express.Router(); 
	  
app.set('jwt_key', config.jwt_key);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

checkAuth.use((req, res, next) => {
    const token = req.headers['access-token'];
	
    if (token) {
      jwt.verify(token, app.get('jwt_key'), (err, decoded) => {      
        if (err) {
          return res.json({ mensaje: 'Invalid Token' });    
        } 
        else {
          req.decoded = decoded;    
          next();
        }
      });
    } 
    else {
      res.send({ 
          message: 'Empty Token !' 
      });
    }
 });      

app.get('/', function(req, res) {
    res.json({ message: 'Hello from Simple RestApi using Nodejs and JSON Web Token.' });
});

app.post('/auth', (req, res) => {
    if(req.body.uid === "bounty" && req.body.pwd === "jvD9FlM8Yruw8apxw3tR") {
		const payload = {
			check:  true
		};

		const token = jwt.sign(payload, app.get('jwt_key'), {
			expiresIn: 1440
		});

		res.json({
			        message: 'Successful Auth !',
		          token: token
		          });
    } 
    else {
        res.json({ message: "Invalid username or password !"})
    }
});

app.get('/plummies-data', checkAuth, (req, res) => {
	const plummies = [
		                    { "_id": "1", "plummie_tag": "bounty", "xp": 100000, "falls": 32894, "steps": 4385, "collisions": 2, "losses": 37, "wins": 1 },
                        { "_id": "2", "plummie_tag": "chinita", "xp": 100000, "falls": 32894, "steps": 4385, "collisions": 2, "losses": 36, "wins": 2 },
                        { "_id": "3", "plummie_tag": "ihan", "xp": 100000, "falls": 32894, "steps": 4385, "collisions": 2, "losses": 50, "wins": 3 },
                        { "_id": "4", "plummie_tag": "dania", "xp": 100000, "falls": 32894, "steps": 4385, "collisions": 2, "losses": 10, "wins": 4 },
                        { "_id": "5", "plummie_tag": "sizzi", "xp": 100000, "falls": 32894, "steps": 4385, "collisions": 2, "losses": 50, "wins": 5 },
                        { "_id": "6", "plummie_tag": "tom", "xp": 100000, "falls": 32894, "steps": 4385, "collisions": 2, "losses": 5, "wins": 6 },
                        { "_id": "7", "plummie_tag": "clowe", "xp": 1000, "falls": 32894, "steps": 4385, "collisions": 2, "losses": 5, "wins": 6 }
                	  ];
	
	res.json(plummies);
});

app.listen(3000, () => {
    console.log('Server running at port 3000') 
});