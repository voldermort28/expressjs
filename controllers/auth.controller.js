const db = require('../db.js')


module.exports = {
    login: (req, res)=>{

        if (!req.cookies){
            res.render('auth/login.pug',{
                pageName: 'Login Page'
            })
            return
        } else {
            var user = db.get('users').find({ id: req.cookies.userId}).value()
            if (!user){
                res.render('auth/login.pug',{
                    pageName: 'Login Page'
                })
                return
            }
        }
        res.redirect('/users')

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
        res.cookie('userId', user.id)
        res.redirect('/users')
    }
}

