const express= require('express');
const session=require('express-session');
const bodyParser=require('body-parser');
const router=express.Router();
const app=express();
const dayCal=24*60*60*1000;
PORT=3000;


app.use(session({
    secret:'Ayushsecretpassword',
    saveUninitialized:true,
    resave:true,
    cookie:{maxAge:dayCal}
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+'/views'));

var sess;

app.get('/',(req,res)=>{
    sess=req.session
    if(sess.email){
        return res.redirect('/admin');
    }
    res.sendFile('index.html');
});

app.post('/login',(req,res)=>{
    sess=req.session;
    sess.email=req.body.email;
    res.end('done');
});

app.get('/admin',(res,req)=>{
    sess=req.session;
    if(sess.email== "Admin@xyz.com"){
        req.session.page_views++; 
        console.log(req.session.page_views)   
        res.write(`<h1>Hello ${sess.email}</h1>`)
        res.end('>Logout');
    }
    else{
        res.write('Please login first.') ;
        res.end('>Login');
    }
});

app.get('/abc',(req,res)=>{
    sess=req.session;
    if(sess.email){
       res.write(`<h1>Hello ${sess.email}</h1>`)
    }
})

app.listen(PORT,()=>{console.log('server Started!')});