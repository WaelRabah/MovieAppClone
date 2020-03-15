const express = require('express');
const router = express.Router();
const { User } = require("../models/User");

const { auth } = require("../middleware/auth");
const {Favorite} = require('../models/Favorite')



router.post("/favoriteNumber", (req, res) => {
    
   Favorite.find({"movieId" : req.body.movieId})
   .exec((err,fav)=>{ 
       if  (err)
       res.status(400).send(err)
        
       res.status(200).json({success : true , favoriteNumber : fav.length})
   })
    
});
router.post("/favored", (req, res) => {
    Favorite.find({"movieId" : req.body.movieId , "userFrom" : req.body.userFrom})
    .exec((err,fav)=>{ 
        
        if  (err)
        res.status(400).send(err)
 
        if (fav.length>0)
                res.status(200).json({success : true , favored : true})
                else 
                res.status(200).json({success : true , favored : false})
    })
     
 });
 router.post("/addToFavorites",(req,res)=>{
     const favorite = new Favorite (req.body)
     
     favorite.save((err,doc)=>{
         
         if (err) return res.json({success : false , err })
         return res.status(200).json({success : true , doc})
     })
 })
 router.post("/removeFavorite",(req,res)=>{
    
    Favorite.findOneAndRemove({"movieId" : req.body.movieId , "userFrom" : req.body.userFrom})
    .exec((err,doc)=>{
        
        if(err)
        {
            return res.json({success : false , err})
        }
        res.status(200).json({success : true , doc })
    })
})
router.get('/:userFrom',(req,res)=>
{
    
    Favorite.find({"userFrom":req.params.userFrom})
    .exec((err,data)=>{
                
                if (err) res.json({success:false,err})
                res.status(200).json({success:true,favorites : data})
    })
})
module.exports = router;
