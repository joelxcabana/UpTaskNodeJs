const express = require('express');
const router = express.Router();

module.exports = function (){
    
        router.get('/',(req,res)=>{
            res.json("HOME");
        });

        router.get('/nosotros',(req,res)=>{
            res.send('NOSOTROS');
        });

return router;
}