const db = require('../db.js')
const shortid = require('shortid');
const md5 = require('md5');
var path = require('path')


module.exports = {
    index : (req, res) => {
        // console.log(db.get('users').value());
        let page = parseInt(req.query.page) || 1
        let perPage = 10
        let start = (page -1)* perPage
        let end = page * perPage
        let numberUser = db.get('users').size().value()

        console.log(db.get('users').size().value());

        res.render('users/index.pug',{
            users: db.get('users').value().slice(start, end),
            pageName: 'User Page',
            page: page,
            prevPage: page-1,
            nextPage: page+1 ,
            lastPage: numberUser / perPage + 1
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
        req.body.password = md5(req.body.password)
        // req.body.avatar = req.file.path.split('\\').slice(1).join("\\")



        var fileName = []
        fileName.push(req.file.path.split('\\').slice(1).shift(), req.file.originalname)
        req.body.avatar = fileName.join("\\")

        // var multer = require('multer');
        // var path = require('path')

        // var storage = multer.diskStorage({
        // destination: function (req, file, cb) {
        //     cb(null, 'uploads/')
        // },
        // filename: function (req, file, cb) {
        //     cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
        // }
        // })

        // var upload = multer({ storage: storage });


        db.get('users').push(req.body).write()
        // users.push(req.body)
        res.redirect('/users')
    },
    delete: (req, res)=>{
        let id = req.params.id
        var user = db.get('users').find({id:id}).value()
        db.get('users').remove(user).write()

        console.log(user);

        res.render('users/index.pug',{
            users: db.get('users').value(),
            pageName:'User Page'
        })
    }
}