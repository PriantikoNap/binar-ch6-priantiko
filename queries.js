const Pool = require('pg').Pool
const express = require('express')
const app = express()
const pool = new Pool({
  user: 'postgres', // your db user
  host: 'localhost',
  database: 'chapter6', // your db name
  password: '1', // your db password
  port: 5432,
})

viewUserGame =(req,res)=>{
    res.render('create/usergame')
}
home =(req,res)=>{
    res.render('home')
}
viewUserGameBiodata =(req,res)=>{
    res.render('create/userbiodata')
}
viewUserGameHistory =(req,res)=>{
    res.render('create/userhistory')
}
viewLoginUser = (req,res)=>{
    res.render('login')
}
loginUser = (req,res)=>{
    if(req.body.username === 'admin' && req.body.password === 'admin'){
        res.render('home')
    }else {
        alert('password salah')
        res.status(401).send({'message':'unauthorize'})
    }
}
//user_game
getAllGames = async(req,res) =>{
try {
    const response = await pool.query('SELECT * FROM user_game');
    res.render('show/usergame',{data: response});
    } catch (err) {
        console.error(err.message);
    }
}
getUserGames = async(req,res)=>{
    const id= req.params.id;
    try {
        const response = await pool.query('SELECT * FROM user_game WHERE id=$1',[id])
        res.render('show/usergame',{data: response});
    } catch (err) {
        console.error(err.message);   
    }
}
addUserGame = async(req,res) =>{
    const {username, pass} = req.body;
    try {
        const response = await pool.query('INSERT INTO user_game (username, pass) VALUES($1, $2) RETURNING *',[username, pass])
        res.render('success');
    } catch (err) {
        console.error(err.message);
    }
}
updateUserGame = async(req,res) => {
    const id = req.params.id;
    const {username, pass} = req.body;
    try {
        const response = await pool.query('UPDATE user_game SET name = $1, email = $2 WHERE id = $3 RETURNING *',[username, pass,id])
        res.render('success');
    } catch (err) {
        console.error(err.message);
    }
    
}
deleteUserGame = async(req, res) =>{
    const id = req.params.id;
    try {
        const response = await pool.query('DELETE FROM user_game WHERE id= $1 RETURNING',[id])
        res.render('success');
    } catch (err) {
        console.error(err.message);
    }
}

//user_game_biodata
getAllBiodata = async(req,res)=>{
    try {
        const response = await pool.query('SELECT * from user_game_biodata');
        res.render('show/userbiodatashow',{data: response});
    } catch (err) {
        console.error(err.message);
    }
}
getUserBiodata = async(req,res) =>{
    const id = req.params.id;
    try {
        const response = await pool.query('SELECT * FROM user_game_biodata WHERE id=$1',[id])
        res.render('show/userbiodatashow',{data: response});
    } catch (err) {
        console.error(err.message);
    }
    
}
addGameBiodata = async(req,res)=>{
    const {nama, alamat, email, wallet, country} = req.body;
    try {
        const response = await pool.query('INSERT INTO user_game_biodata (nama, alamat, email, wallet, country) VALUES($1, $2, $3, $4, $5) RETURNING *',[nama, alamat,email, parseInt(wallet),country])
        res.render('success');
       
    } catch (err) {
     console.error(err.message);
    }
}
updateGameBiodata = async(req, res) =>{
    const id = req.params.id;
    const {nama, alamat, email, wallet, country} = req.body;
    
    try {
        const response = await pool.query('UPDATE user_game_biodata SET nama = $1, alamat = $2, email = $3, wallet = $4, country = $5 WHERE id =$6 RETURNING *',[nama, alamat,email, wallet,country, id])
        res.render('success');
    } catch (err) {
        console.error(err.message);  
    }
}

deleteGameBiodata = async(req, res) => {
    const id = req.params.id;
    try {
        const response = await pool.query('DELETE FROM user_game_biodata WHERE id = $1',[id])
        res.render('success');
    } catch (err) {
        console.error(err.message);
        
    }
}

//user_game_history
getAllHistory = async(req,res) =>{
    try {
        const response = await pool.query('SELECT * FROM user_game_history');
        res.render('show/userhistoryshow',{data: response});
    } catch (err) {
        console.error(err.message);
    }
}

getUserHistory = async(req,res)=>{
    const id = req.params.id;
    try {
        const response = await pool.query('SELECT * FROM user_game_history WHERE id = $1',[id])
        res.render('show/userhistoryshow',{data: response});
    } catch (err) {
        console.error(err.message);
    }
}
addUserHistory = async(req,res) => {
    const {played, lvl} = req.body;
    try {
        const response = await pool.query('INSERT INTO user_game_history (played, lvl) VALUES ($1,$2) RETURNING *',[parseInt(played),parseInt(lvl)])
        res.render('success');
    } catch (err) {
        console.error(err.message);
    }
}
updateUserHistory = async(req,res) => {
    const id = req.params.id;
    const {played, lvl} = req.body;
    cons
    try {
        const response = await pool.query('UPDATE user_game_history SET player=$1, lvl=$2 WHERE id=$1',[played,lvl,id])
        res.render('success');
    } catch (err) {
        console.error(err.message);
    }
}
deleteUserHistory = async(req,res) => {
    const id = req.params.id;
    try {
        const response = await pool.query('DELETE FROM players WHERE id = $1',[id])
        res.render('success');
    } catch (err) {
        console.error(err.message);
    }
}
module.exports = {
    viewUserGame,
    viewUserGameBiodata,
    viewUserGameHistory,
    getAllGames,
    getUserGames,
    addUserGame,
    updateUserGame,
    deleteUserGame,
    getAllBiodata,
    getUserBiodata,
    addGameBiodata,
    updateGameBiodata,
    deleteGameBiodata,
    getAllHistory,
    getUserHistory,
    addUserHistory,
    updateUserHistory,
    deleteUserHistory,
    viewLoginUser,
    loginUser,
    home
  }