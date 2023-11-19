const express = require('express');
const request = require('request');
const bodyparser = require('body-parser');
const https = require("https");

const app = express();
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended: true}));
app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
    const fname = req.body.FirstName;
    const lname = req.body.LastName;
    const email = req.body.email;

    console.log(fname, lname, email);
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fname,
                    LNAME: lname
                }
            }
        ]
    };
    var jsondata = JSON.stringify(data);
    const url = "https://us21.api.mailchimp.com/3.0/lists/85111eb0c7/";

    const options = {
        method: "POST",
        auth: "sutej1:d3061128d5175d10f5407f14fe80c0f9-us21"
    };


    const request = https.request(url, options, function(response){
        if(response.statusCode == 200)
        {
            res.sendFile(__dirname + "/success.html");
        }
        else
        res.sendFile(__dirname + "/failure.html");
        
        response.on("data", function(data){
            //console.log(JSON.parse(data));
        });
    });
    request.write(jsondata);
    request.end();
});

app.post("/failure", function(req, res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
    console.log("port 3000 running successfully!");
});


//list id
//85111eb0c7