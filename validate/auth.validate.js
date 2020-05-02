module.exports.postLogin = function(req, res, next){
    errors = []

    if (!req.body.email) {errors.push('Email is require')}
    if (!req.body.password) { errors.push('Password is require')}
    if (errors.length){ 
        res.render('auth/login.pug',{
            pageName: "Login page",
            errors : errors,
            value: req.body
        })
        return
    }
    next()
}
