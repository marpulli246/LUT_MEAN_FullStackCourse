const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger');
const members = require('./Members')


const app = express();



//Init middleware
//app.use(logger);

//Handlebars middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//res.send(req.params.id));

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Usually you do not have both static and homepage route same time

//Homepage route
app.get('/', (req, res) => 
    res.render('index', {
    title: 'Members App',
    members    
    })
);

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Members API routes
app.use('/api/members', require('./routes/api/members'));

/* app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
    // res.send('<h1>Hello freaking world!!</h1>');
}) */;

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Server started on port', PORT));
