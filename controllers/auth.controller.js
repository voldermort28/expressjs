const db = require('../db.js')


module.exports = {
    login: (req, res)=>{
        res.render('auth/login.pug',{
            pageName: 'Login Page'
        })
    },
    postLogin: (req, res)=>{
        var email = req.body.email
        var password = req.body.password
        var user = db.get('users').find({email:email}).value()
        
        if (!user){
            res.render('auth/login',{
                errors: ['User does not exist'],
                value: req.body
            })
            return;
        }
        if (user.password !== password){
            res.render('auth/login',{
                errors: ['Wrong password'],
                value: req.body
            })
            return;
        }
        res.redirect('/users')
    }
}

