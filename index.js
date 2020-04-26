const express = require('express');
const app = express();

const port = 3000

var users = [
    {name:'Hung', age: 32},
    {name:'Vy', age: 21},
    {name:'Hoang', age: 34},
    {name:'Anh', age: 46}
]

app.get('/', (req, res) => {
    res.render('index.pug', {
        name: 'Hùng',
    });
});

app.get('/users', (req, res) => {
    res.render('users/index.pug',{
        users: users,
        pageName: 'User Page'
    })
})

app.get('/users/search', (req, res)=>{
    // res.render('search/index.pug')

    // console.log(req.query.q);
    let q = req.query.find.toLowerCase()
    var matchedValue = users.filter(function(user){
        return user.name.toLowerCase().indexOf(q) != -1
    })

    res.render('users/index.pug', {
        users : matchedValue,
        pageName: 'Search Page'
    })
    
    // var searchForm = document.getElementById('search-form')
    // searchForm.value = q
    // console.log(searchForm);
})

app.get('/users/create', (req, res)=>{
    res.render('users/create.pug')
    // console.log(req);
})


app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.post('/users/create', (req, res)=>{
    console.log(req.body);
    res.json(req.body)
    users.push(req.body)
    res.redirect('/users')
})

app.listen(port, () => {
    console.log('Example app listening on port port!');
});

//Run app, then load http://localhost:port in a browser to see the output.