const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const moment = require("moment");
const schema = mongoose.Schema

const favoriteSchema = mongoose.Schema({
    userFrom : {
        type : schema.Types.ObjectId ,
        ref : 'User'
    } ,
    movieId : 
    {
        type : String
    },
    movieTitle : 
    {
        type : String
    }
    ,
    movieImage : 
    {
        type : String
    }
    ,movieRuntime : 
    {
        type : Number
    }

})




const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = { Favorite }