const db = require('../db.js')

module.exports = {
    requireAuth: (req, res, next)=>{
        console.log(req.cookies);
        if (!req.cookies){
            res.redirect('/auth/login')
            return
        } else {
            var user = db.get('users').find({ id: req.cookies.userId}).value()
            if (!user){
                res.redirect('/auth/login')
                return
            }
        }
        next()
    }
}