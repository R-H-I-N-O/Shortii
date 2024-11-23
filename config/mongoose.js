const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/urlshortner")
    .then(console.log("DB connected successfully"))
        .catch((err)=>{
            if(err){
                console.log("DB connection failed")
            }
        });