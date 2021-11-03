const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()

//Connect to MongoDB
const mongo = `mongodb+srv://peachykeen:${mongo_key}@recyclopedia-project.fry8o.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

app.use(express.json())
app.use(cors())

const ctrl = require('./controller')

app.get('/api/recyclables/:name', ctrl.getRecyclables)

app.get('/api/donate', ctrl.getDonation)
app.post('/api/donate', ctrl.createDonation)
app.put('/api/donate/:id', ctrl.updateDonation)
app.delete('/api/donate/:id', ctrl.deleteDonation)

const port = process.env.PORT || 4567

app.listen(port, () => console.log(`Rockin' and Rollin' on ${port}`))