const express = require('express');
// const db = require('./db.js')
const userRoute = require('./routers/user.route')

const port = 3000

const app = express();
app.get('/', (req, res) => {
    res.render('index.pug', {
        name: 'Hùng',
        email:'hung@hung'
    });
});

// app.use(express.static(__dirname + '/public'));
app.use('/users', userRoute)
app.use(express.static('public'))

app.listen(port, () => {
    console.log('Example app listening on port port!');
});

//Run app, then load http://localhost:port in a browser to see the output.