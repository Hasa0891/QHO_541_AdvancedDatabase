const express = require('experss');

const app = express();

app.get('/',(req,res,next)=>{
    res.send('<h1> Welcome to the App </h1>');
});

app.listen(3000,()=>{
    console.log('App is listening on port 3000');
});
