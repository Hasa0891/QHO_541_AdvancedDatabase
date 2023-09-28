const Approval = require('../models/approval');
const Announcement = require('../models/announcement');
const Pandemicdata = require('../models/pandemicdata');
const AggregateData = require('../models/aggregatedata');

exports.getDashboard = async (req,res,next) => {
    // Page after the login and admin verification complete.
    let approval = await Approval.findOne({organization: organization._id});
    res.render('organization/dashboard',{pageTitle: 'Dashboard',approval:approval});
}

exports.getAddAnnouncement = (req,res,next) => {
    //shows the add announcement form
    res.render('organization/addannouncement',{pageTitle:'Announce'})
}

exports.postAddAnnouncement = async (req,res,next) => {
    //process the add announcement form
    //adds new announcement
    let title = req.body.title;
    let content = req.body.content;
    let featured_url = req.file.filename;
    let author = organization._id;
    let announce = new Announcement({
        title:title,
        author:author,
        content: content,
        featured_url: featured_url
    });
    await announce.save();
    res.redirect('/organization/dashboard');
}

exports.getAnnouncements = async (req,res,next) => {
    //shows the announcements made by the organization
    //edit and delete button is shown
    let anns = await Announcement.find({
        author: organization._id
    });
    res.render('organization/announcements',{pageTitle:'Announcements by you',anns:anns});
}

exports.getEditAnnouncement = async (req,res,next) => {
    //shows announcement edit form
    let ann = await Announcement.findById(req.params.announcementId);
    res.render('organization/editannouncement',{pageTitle:'Edit Announcement', ann:ann});
}

exports.postEditAnnouncement = async (req,res,next) => {
    //process announcement edit form
    //updates the announcement collection in the database
    let title = req.body.title;
    let content = req.body.content;
    let id = req.params.announcementId;
    await Announcement.findOneAndUpdate({_id:id, author:organization._id},{title:title,content:content},{new:true});
    let anns = await Announcement.find({author:organization._id});
    res.render('organization/announcements',{pageTitle:'Announcements by you',anns:anns});
}

exports.deleteAnnouncement = async (req,res,next) => {
    //deletes a particular announcement based on announcementId
    let id = req.params.announcementId;
    let ann = await Announcement.findById(id);
    await Announcement.findOneAndDelete({_id:id,author:organization._id});
    res.redirect('/organization/dashboard/announcements');
}
exports.getAddData = async (req,res,next) => {
    //shows add data form
    res.render('organization/adddata',{pageTitle: 'Add New Data'});
}

exports.postAddData = async (req,res,next) => {
    //process add data form
    //adds new data

    let dt = new Date();
    const year = dt.getFullYear();
    const month = String(dt.getMonth() + 1).padStart(2, '0');
    const day = String(dt.getDate()).padStart(2, '0'); 
    date = `${year}-${month}-${day}`;
 
    let pandata = await Pandemicdata.findOne({date:date});
    if(pandata == null){
        let new_case = req.body.new_case;
        let death = req.body.death;
        let recovered = req.body.recovered;
        let data = new Pandemicdata({
            date: new Date(date),
            new_case: new_case,
            death: death,
            recovered: recovered,
            country: organization.country,
            organization: organization._id
        });
        await data.save();
        let aggdata = await AggregateData.findOne({date: new Date(date), country: organization.country});
        if(aggdata == null){
            aggdata = new AggregateData({
                country: organization.country,
                date : new Date(date),
                confirmed: new_case,
                death: death,
                recovered: recovered
            });
            await aggdata.save();
        }
        else{
            let prevconfirmed = aggdata.confirmed;
            let prevdeath = aggdata.death;
            let prevrecovered = aggdata.recovered;
            await AggregateData.findOneAndUpdate({
                date: new Date(date), 
                country: organization.country
            },
            {
                confirmed: Number(prevconfirmed)+Number(new_case),
                death: Number(prevdeath)+Number(death),
                recovered: Number(prevrecovered)+Number(recovered)
            }),
            {
                new: true
            }
        }
    }
    else{
        message.text="You Already Added Data today!";      
        message.shown = false;
        message.type = 'warning';
    }
    res.redirect('/organization/dashboard/addeddata');
}

exports.getAddedData = async (req,res,next) => {
    //shows data as table
    //adds option to edit/delete in rows
    let pandata = await Pandemicdata.find({organization: organization._id});
    let pandataUpd = pandata.map((data)=>{
        let dt = data.date;
        const year = dt.getFullYear();
        const month = String(dt.getMonth() + 1).padStart(2, '0');
        const day = String(dt.getDate()).padStart(2, '0'); 
        data.datestr = `${year}-${month}-${day}`;
        return data;
    });
    res.render('organization/addeddata',{pageTitle:'Data You Added',pandata:pandataUpd});
    message.shown = true;
}

exports.getEditData = async (req,res,next) => {
    //shows edit data form
    let data = await Pandemicdata.findById(req.params.dataId);
    res.render('organization/editdata',{pageTitle:'Edit Added Data',data:data});
}

exports.postEditData = async (req,res,next) => {
    //process edit data form
    //updates data on the database
    let id = req.params.dataId;
    let new_case = req.body.new_case;
    let death = req.body.death;
    let recovered = req.body.recovered;

    let prev = await Pandemicdata.findOne({_id:id, organization:organization._id});

    let dt = new Date(prev.date);
    const year = dt.getFullYear();
    const month = String(dt.getMonth() + 1).padStart(2, '0');
    const day = String(dt.getDate()).padStart(2, '0'); 
    date = `${year}-${month}-${day}`;

    let aggprev = await AggregateData.findOne({date: new Date(date), country: organization.country});
    await Pandemicdata.findOneAndUpdate({_id:id, organization:organization._id},{new_case,death,recovered},{new:true});

    await AggregateData.findOneAndUpdate(
        {
            date: new Date(date),
            country: organization.country
        },
        {
            confirmed: Number(aggprev.confirmed)+Number(new_case)-Number(prev.new_case),
            death: Number(aggprev.death)+Number(death)-Number(prev.death),
            recovered: Number(aggprev.recovered)+Number(recovered)-Number(prev.recovered)
        },
        {
            new: true
        }
    );
    res.redirect('/organization/dashboard/addeddata');
}

exports.deleteData = async (req,res,next) => {
    //deletes added data from database
    let prev = await Pandemicdata.findOne({_id:req.params.dataId, organization:organization._id});

    let dt = new Date(prev.date);
    const year = dt.getFullYear();
    const month = String(dt.getMonth() + 1).padStart(2, '0');
    const day = String(dt.getDate()).padStart(2, '0'); 
    date = `${year}-${month}-${day}`;

    let aggprev = await AggregateData.findOne({date: new Date(date), country: organization.country});

    await AggregateData.findOneAndUpdate(
        {
            date: new Date(date),
            country: organization.country
        },
        {
            confirmed: Number(aggprev.confirmed)-Number(prev.new_case),
            death: Number(aggprev.death)-Number(prev.death),
            recovered: Number(aggprev.recovered)-Number(prev.recovered)
        },
        {
            new: true
        }
    );

    await Pandemicdata.findOneAndDelete({_id:req.params.dataId, organization:organization._id});
    res.redirect('/organization/dashboard/addeddata');
}