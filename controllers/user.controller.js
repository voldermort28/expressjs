const db = require('../db.js')
const shortid = require('shortid');

module.exports = {
    index : (req, res) => {
        // console.log(db.get('users').value());
        res.render('users/index.pug',{
            users: db.get('users').value(),
            pageName: 'User Page'
        })
    },
    search : (req, res)=>{
        // res.render('search/index.pug')
        users = db.get('users').value()
        // console.log(req.query.q);
        let q = req.query.findKey.toLowerCase()
        var matchedValue = users.filter(function(user){
            return user.name.toLowerCase().indexOf(q) != -1
        })
    
        res.render('users/index.pug', {
            users : matchedValue,
            pageName: 'Search Page'
        })
    
    },
    create: (req, res)=>{
        res.render('users/create.pug',{
            pageName: "Create page"
        })
        // console.log(req);
    },
    view: function (req, res) {
        // res.send(req.params.id)
        console.log('req.params:' + req.params);
        id = req.params.id
        
        console.log('id:' + id);
        var user = db.get('users').find({id:id}).value()
        res.render('users/view.pug', {
            users: user
        })
      },
    postCreate: (req, res)=>{
        // console.log(req.body);
        console.log(req.body);
        // res.json(req.body)
        req.body.id = shortid.generate();
        db.get('users').push(req.body).write()
        // users.push(req.body)
        res.redirect('/users')
    }

}