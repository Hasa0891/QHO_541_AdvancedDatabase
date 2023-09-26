const fs = require('fs');
const csv = require('csv-parser');
const Country = require('./models/country');
const Aggregatedata = require('./models/aggregatedata');
const connectToDatabase = require('./utils/database');

connectToDatabase().catch((err)=>{
    console.log(err);
});

const filepath = 'full_grouped.csv';

const countries = new Set();

fs.createReadStream(filepath)
  .pipe(csv())
  .on('data', async (data) => {
    countries.add(JSON.stringify({
        name: data['Country/Region'],
        who_region: data['WHO Region']
    }))
    let agg = new Aggregatedata({
        country: data['Country/Region'],
        date: new Date(data.Date),
        confirmed: data.Confirmed,
        death: data.Deaths,
        recovered: data.Recovered
    });
    await agg.save();
  })
  .on('end', async () => {
    console.log('Finished!');

    const uniqueCountries = Array.from(countries).map((jsonString)=>{
        return JSON.parse(jsonString);
    });

    for( data of uniqueCountries){
        let tmp = new Country(data);
        await tmp.save();
    }
});