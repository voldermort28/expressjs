const db = require('../../db.js')


module.exports = {
    index : (req, res) => {
        res.json(db.get('users').value())
    }
}