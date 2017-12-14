const express = require('express');
const app = express();
const path = require('path');
const {getLyrics} = require('./controllers/controller')
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.render('main'));

app.get('/search', (req, res) => {
    // console.log(req.query)
    getLyrics(req.query, res);
}
    // res.send({lyrics}); }
);







app.listen(3000, () => console.log('Example app listening on port 3000!'));