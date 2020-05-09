const db = require('../db.js')
const md5 = require('md5');


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

        hashedPassword = md5(password)
        if (user.password !== hashedPassword){
            res.render('auth/login',{
                errors: ['Wrong password'],
                value: req.body
            })
            return;
        }
        res.cookie('userId', user.id,{signed:true})
        res.redirect('/users')
    },
    clearCookie: (req, res)=>{
        res.clearCookie('userId')
        res.redirect('/auth/login')
        console.log('Cookie is delete');
    }
}

