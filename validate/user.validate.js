module.exports.postCreate = function(req, res, next){
    errors = []

    if (!req.body.name) {errors.push('Name is require')}
    if (!req.body.phone) { errors.push('Phone is require')}
    if (errors.length){ 
        res.render('users/create.pug',{
            pageName: "Create page",
            errors : errors,
            value: req.body
        })
        return
    }
    next()
}
