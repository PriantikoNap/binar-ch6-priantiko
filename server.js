const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 5001
const db = require('./queries')

app.use(express.static('public'))
app.set('view engine', 'ejs')



app.use(express.urlencoded({ extended: false }))
app.use(express.json());




//user game routing
app.get('/usergames/create', db.viewUserGame)
app.post('/addusergames',db.addUserGame)
app.put('/usergames/update', db.updateUserGame)
app.delete('/usergames/delete/:id', db.deleteUserGame)
app.get('/usergame',db.getAllGames)
app.get('/usergame/:id', db.getUserGames)

//user biodata routing
app.get('/userbiodata/create',db.viewUserGameBiodata)
app.post('/adduserbiodata', db.addGameBiodata)
app.put('/userbiodata/update',db.updateGameBiodata)
app.delete('/userbiodata/delete/:id', db.deleteGameBiodata)
app.get('/userbiodata',db.getAllBiodata)
app.get('/userbiodata/:id', db.getUserBiodata)

//user biodata history
app.get('/userhistory/create', db.viewUserGameHistory)
app.post('/adduserhistory', db.addUserHistory)
app.put('/userhistory/update', db.updateUserHistory)
app.delete('/userhistory/delete/:id', db.deleteUserHistory)
app.get('/userhistory', db.getAllHistory)
app.get('/userhistory/:id', db.getUserHistory)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })