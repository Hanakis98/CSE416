const express = require("express");
const router = express.Router();
const db = require("../database.js");
const dbName = "CSE416";
const collectionName = "Advisors";
const GPDModel = require("../models/advisorModel.js");
const jwt = require("jsonwebtoken");
const keys = require("../keys.js");
const axios = require("axios")
var sha = require("sha1")
const cookieParser = require("cookie-parser");

mongoose = require("mongoose")
axios.defaults.withCredentials = true;
router.use(cookieParser())

db.initialize(dbName, collectionName, function (dbCollection) { // successCallback

    router.post("/login", (req, res) => {
      
        const idField = req.body.sbu_id;
        const providedPassword1 = (req.body.password );

        if(  dbCollection.findOne({ sbu_id:idField,password:providedPassword1}) == null){
          res.cookie("token",  false ,{ domain: localhost,maxage:3000, httpOnly: true , withCredentials: true,path:"/" });
          res.cookie("gpdLoggedIn",0,{ maxage:3000, httpOnly: false ,path:"/" });
          res.send();
          return
        }
 
          // Check if user exists
          // Check password    
          dbCollection.findOne({ sbu_id:idField,password:providedPassword1}).then(user => {
          if(user == null){
            res.statusCode=400
            res.cookie("token",  false ,{ maxage:3000, httpOnly: true , path:"/" });
            res.cookie("gpdLoggedIn",0,{ maxage:3000, httpOnly: false ,path:"/" });
            res.cookie("studentLoggedIn",0,{ maxage:300, httpOnly: false ,path:"/" });

            res.send();
          }
         
              // User matched
              // Create JWT Payload
              const payload = {
                sbu_id: idField,
                typeOf: "advisor"
              };// Sign token

              jwt.sign(
                payload,
                keys.secretOrKeyAdvisors,
                {
                  expiresIn: 3000 // 50 min in seconds
                },
                (err, token) => {
                    if(!err)
                    {
                      res.cookie("firstName",  user.first_name)
                      res.cookie("lastName" , user.last_name)
                        res.cookie("token",  token ,{ maxage:1000*1000, httpOnly: true ,path:"/" });
                        res.cookie("gpdLoggedIn",1,{ maxage:1000*1000, httpOnly: false ,path:"/" });
                        res.cookie("studentLoggedIn",0,{ maxage:300, httpOnly: false ,path:"/" });

                        res.send();
                      
                    }
                    
                }
              );
           });
      });

    router.get("/allGPDs", (request, response) => {
        // return updated list
        dbCollection.find().toArray((error, result) => {
            if (error) throw error;
            response.json(result);
        });
    });
    
  
   
}, function(err) { // failureCallback
    throw (err);
});

module.exports = router