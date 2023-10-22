const db = require("../settings/db")
const fullPath = require('../index')

class FileController {

    async loadFile(req, res) {
        const file = req.files.file
        const myId = req.user.id
        
        if(file.name) {
            
            await db.promise().execute("INSERT INTO user_avatars (name, path, type) VALUES(?, ?, ?)", [file.name, file.path, file.type])
                .then( ([rows,fields]) => {
                    const newAvatarId = rows.insertId
                    console.log('Avatar inserted with id=', newAvatarId);
                    return db.promise().execute("DELETE FROM user_avatars WHERE id IN (SELECT avatar FROM users WHERE id=?)", [myId])
                        .then(() => {
                            console.log('Old avatar deleted.')
                            return db.promise().execute("UPDATE users SET avatar = ? WHERE id = ?", [newAvatarId, myId])
                        })
                        .then(() => {
                            console.log('User avatar updated.')
                        })
                })
                .catch( error => {
                    console.log(error)
                    res.status(400).json({message: `Something went wrong ${error}`})
                })
                .then( () => {
                    console.log('Done.')
                    res.json({message: "file was upload", path: file.path})
                });

        }   
    }

    async getFile(req,res) {
        const myId = req.user.id
        const path = req.query.path
        
        await db.promise().query("SELECT type FROM user_avatars WHERE path=?", [path])
        .then(([rows,fields]) => {
            console.log('Type request=', rows, fields);
            const contentType = rows[0].type
            res.set({
                "Content-Type": contentType || 'image/jpeg'
            })
        })
        .catch(error => {
            res.status(400).json({message: `Something went wrong ${error}`})
        })
        .then(() => {
            res.sendFile(fullPath + path)
        })
    }
}

module.exports = new FileController()