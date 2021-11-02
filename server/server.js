const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()

app.use(express.json())
app.use(cors())

const ctrl = require('./controller')

app.get('/api/recyclables/:name', ctrl.getRecyclables)

app.get('/', function(req,res) {
    res.sendFile(path.join(__dirname, "../client/client.html"))
})
app.get('/css', function (req,res) {
    res.sendFile(path.join(__dirname, "../client/styles.css"))
})

const port = process.env.PORT || 4567

app.listen(port, () => console.log(`Rockin' and Rollin' on ${port}`))