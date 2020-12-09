const express=require('express');
const app=express();
const request=require('request');
//const exphbs=require('express-handlebars');
const bodyparser = require("body-parser")
app.use(bodyparser.urlencoded({ extended: true}))
app.use(bodyparser.json());
const mongoose=require('mongoose');
var config=require('./config/database');
//app.engine('hsebs',exphbs({ extname: '.hbs'}))
var Code=require('./models/code');
mongoose.Promise=global.Promise;

//connect mongodb
mongoose.connect(config.database,{useNewUrlParser:true});



const path=require('path');
app.use(express.static(path.join(__dirname,'public')));
app.set('view engine','ejs');




//var weather=0;
app.get("/",function(req,res){
    var country='in';
    const url=' http://newsapi.org/v2/top-headlines?country='+country+'&apiKey=xxxxxxxxxxx';
    request(url,function(error,response,body){
        news_json=JSON.parse(body);
     
        
            
          var  contest=news_json.articles;
        res.render('home',{contest:contest});
    })

})
app.post("/",function(req,res){
    console.log(req.body.country);
    Code.findOne({CLDR:req.body.country}).then(posts=>{
         
        

    
    var country=posts.WMO;
    console.log(country);
    const url=' http://newsapi.org/v2/top-headlines?country='+country+'&apiKey=xxxxxxxxxxxx';
    request(url,function(error,response,body){
        news_json=JSON.parse(body);   
          var  contest=news_json.articles;
        res.render('home',{contest:contest});
    })
})
})


app.listen(8000,function(){
    console.log('started at 8000');
})