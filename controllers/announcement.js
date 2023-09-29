const Announcement = require('../models/announcement');
const Organization = require('../models/organization');

exports.getAnnouncements = async (req,res,next) => {
    const announcements = await Announcement.find({});
    res.render('announcement',{pageTitle: "Announcements", announcements: announcements});
}

exports.getAnnouncementDetails = async (req,res,next) => {
    let id = req.params.announcementId;
    let ann = await Announcement.findById(id);
    let author = await Organization.findById(ann.author);
    res.render('announcementDetails',{pageTitle: "Announcement Details",ann:ann, author:author});
}