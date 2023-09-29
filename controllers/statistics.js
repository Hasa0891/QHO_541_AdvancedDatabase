const Country = require('../models/country');
const Aggregatedata = require('../models/aggregatedata');

exports.getStatistics = async (req,res,next) => {
    const countries = await Country.find({});
    let dt = new Date();
    const year = dt.getFullYear();
    const month = String(dt.getMonth() + 1).padStart(2, '0');
    const day = String(dt.getDate()).padStart(2, '0'); 
    date = `${year}-${month}-${day}`;
    const allData = await Aggregatedata.find({date:new Date(date)});
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
    res.render('statistics',{pageTitle:'Pandemic Statistics',countries,singleDay,allData});
}

exports.postStatistics = async (req,res,next) => {
    const countries = await Country.find({});
    let id = req.body.country;
    let country;
    const allData = await Aggregatedata.find({date:new Date(req.body.date)});
    let singleDay = {};
    if( id !== 'All'){
        country = await Country.findById(id);
        country = country.name;
        const SingleRegionData = await Aggregatedata.findOne({country:country, date: new Date(req.body.date)});
        if(SingleRegionData != null){
            singleDay = SingleRegionData;
        }
        else{
            singleDay.confirmed = 0;
            singleDay.death = 0;
            singleDay.recovered = 0;
            singleDay.country = country;
        }
    }
    else{
        singleDay.confirmed = 0;
        singleDay.death = 0;
        singleDay.recovered = 0;
        singleDay.country = id;
        for( data of allData){
            singleDay.confirmed += Number(data.confirmed);
            singleDay.death += Number(data.death);
            singleDay.recovered += Number(data.recovered);
        }
    }
    singleDay.datestr = req.body.date;
    res.render('statistics',{pageTitle:'Pandemic Statistics',countries,singleDay,allData});
}