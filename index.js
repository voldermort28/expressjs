const express = require('express');
// const db = require('./db.js')
const cookieParser = require('cookie-parser')

// const paginate = require('express-paginate');

const userRoute = require('./routers/user.route')
const authRoute = require('./routers/auth.route')

const authMiddleware = require('./middleware/auth.middleware')

const port = 3000

const app = express();
app.get('/', (req, res) => {
    res.render('index.pug', {
        name: 'Hùng',
        email:'hung@hung'
    });
});

// app.use(express.static(__dirname + '/public'));
app.set('view engine', 'pug')

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(cookieParser('quangmauhung'))

app.use('/users', authMiddleware.requireAuth, userRoute)

app.use('/auth', authRoute)

app.use(express.static('public'))

app.listen(port, () => {
    console.log('Example app listening on port port!');
});

//Run app, then load http://localhost:port in a browser to see the output.