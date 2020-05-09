const db = require('../db.js')

module.exports = {
    pagination: (req, res, next)=>{
        console.log('cookie: '+ req.cookies.userId, ' signedCookie: '+ req.signedCookies.userId);
        if (!req.signedCookies){
            res.redirect('/auth/login')
            return
        } else {
            var user = db.get('users').find({ id: req.signedCookies.userId}).value()
            if (!user){
                res.redirect('/auth/login')
                return
            }
        }
        res.locals.user = user
        next()
    }
}