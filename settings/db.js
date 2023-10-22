const mySql = require("mysql2")

const connection = mySql.createConnection({
    host: "127.0.0.1",
    user: "admin",
    password: "admin",
    database: "myappdb"
})
/*connection.connect( (e) => {
    if(e) {
        return console.error("Get error: " + e.stack)
    }
    console.log("Succsesful connect to db")
})*/

module.exports = connection