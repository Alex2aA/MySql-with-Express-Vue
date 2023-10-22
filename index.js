const express = require('express')
const app = express()
const cors = require("cors");
const port = process.env.PORT || 3305
const bodyParser = require('body-parser')
const formiadble = require('express-formidable')
const fullPath = __dirname + '/'
const path = __dirname + '/views/'

module.exports = fullPath

app.use(express.json())

var corsOptions = {
    origin: "http://localhost:8080"
};
app.use(cors(corsOptions));

//загрузка статич. файлов
app.use(express.static(path))
app.get('/', (req, res) => {
    res.sendFile(path + 'index.html')
})


//routes
const userRouter = require('./routes/usersRoutes')
const filesRoutes = require('./routes/filesRoutes')

//использую formiadble для файлов
app.use('/api/files',formiadble({
    uploadDir: './files/avatarsUsers',
}), filesRoutes)
app.use('/api/user', userRouter)

app.listen(port, () => {
     console.log(`App listen on port ${port}`)
})

