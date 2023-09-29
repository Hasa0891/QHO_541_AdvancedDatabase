const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();
const {WEB_PORT} = process.env
const session = require('express-session');
const connectToDatabase = require('./utils/database');
const AggregateData = require('./models/aggregatedata');
const Announcement = require('./models/announcement');

connectToDatabase().catch((err)=>{
    console.log(err);
})

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,'public')));
app.use(session({
    secret:"Md Mahmudul Hasan",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: new Date(253402300000000)
    }
}));

global.message = {
    shown: true,
    text: "",
    type: "danger"
}

const organizationRoutes = require('./routes/organization');
const statRoutes = require('./routes/statistics');
const announceRoutes = require('./routes/announcement');
const adminRoutes = require('./routes/admin');
const userMiddleware = require('./middlewares/userMiddleware');

app.get('*', userMiddleware.setUserMiddleware);
app.use('/organization',organizationRoutes);
app.use('/statistics',statRoutes);
app.use('/announcement',announceRoutes);
app.use('/admin',adminRoutes);

app.get('/', async (req,res,next)=>{
    let dt = new Date();
    const year = dt.getFullYear();
    const month = String(dt.getMonth() + 1).padStart(2, '0');
    const day = String(dt.getDate()).padStart(2, '0'); 
    date = `${year}-${month}-${day}`;
    const allData = await AggregateData.find({date:new Date(date)});
    let singleDay = {
        country:'All',
        confirmed : 0,
        death : 0,
        recovered: 0
    }
    for( data of allData){
        singleDay.confirmed += Number(data.confirmed);
        singleDay.death += Number(data.death);
        singleDay.recovered += Number(data.recovered);
    }
    singleDay.datestr = date;
    const announcements = await Announcement.find({}).sort({publicationDate: -1}).limit(3);
    res.render('index',{pageTitle:"Homepage",singleDay,announcements});
});

app.listen(WEB_PORT,()=>{
    console.log(`App is listening on the port ${WEB_PORT}`);
})
