const db = require('../settings/db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {secret} = require('../config')

const generateAccessToken = (id, name) => {
    const payload = {
        id,
        name
    }
    return jwt.sign(payload, secret, {expiresIn: '24h'})
}

class UserController {

    async getAllUsers(req, res) {
        db.query('SELECT * FROM `users`', (error, rows, fields) => {
            if(error) {
                console.log(`Something went wrong ${error}`)
                res.status(400).json({message: `Something went wrong ${error}`})
            } else {
                res.json(rows)
            }
        })
    }

    async registration(req,res) {
        const {username, password} = req.body
        const hashPassword = bcrypt.hashSync(password, 7)

        const sql = "INSERT INTO users (username, password) VALUES(?,?)"
        db.query(sql, [username,hashPassword],(error, result) => {
            if(error) {
                console.log(`Something went wrong ${error}`)
                res.status(400).json({message: `Something went wrong ${error}`})
            } else {
                const token = generateAccessToken(result.insertId, username)
                console.log(`user was register like ${username}`)
                res.json({message: `user was register like ${username}`, token})
            }
        })
    }

    async login(req, res) {
        const {username, password} = req.body
        console.log(req.body)
        console.log(username, password)

        if(username && password) {
            db.query("SELECT id, username, password FROM users WHERE username = ?",[username], (error, rows) => {
                if (error) {
                    console.log(`Something went wrong ${error}`)
                    res.status(400).json({message: `Something went wrong ${error}`})
                } else {
                    var comparePassword, id
                    rows.forEach(el => {
                        comparePassword = el.password
                        id = el.id
                    })
                    if (bcrypt.compareSync(password, comparePassword)) {
                        const token = generateAccessToken(id, username)
                        console.log(`you are logged how ${username}`)
                        res.json({message: "You are looged in", token})
                    } else {
                        res.status(403).json({message: "Incorrectly entered data"})
                    }
                }
            })
        } else {
            res.status(400).json({message: "username or password must be not null"})
        }
        
    }

    async getUserInfo(req,res) {
        const myId = req.user.id

        db.query("SELECT path FROM user_avatars WHERE path IS NOT NULL AND id = ?",[myId],(error, rows) => {
            if(error) {
                console.log(`Something went wrong ${error}`)
                res.status(400).json({message: `Something went wrong ${error}`})
            } else {
                res.json({rows})
            }
        })
    }
}

module.exports = new UserController()