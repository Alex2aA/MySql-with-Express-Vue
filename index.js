const express = require('express')
const app = express()
const port = process.env.PORT || 3305
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

//routes
const userRouter = require('./routes/usersRoutes')

app.use('/api/user', userRouter)

app.listen(port, () => {
     console.log(`App listen on port ${port}`)
})

