require('dotenv').config();
const {ADMIN_NAME,ADMIN_PASS} = process.env;
const Approval = require('../models/approval');
const Organization = require('../models/organization');

exports.getAdminLogin = (req,res,next) => {
    res.render('admin/login',{pageTitle:"Admin Login"});
    message.shown = true;
}

exports.getAdminLogOut = (req,res,next) => {
    admin = false;
    res.redirect('/admin/login');
}

exports.postAdminLogin = (req,res,next) => {
    let username = req.body.username;
    let password = req.body.password;
    if(username === ADMIN_NAME && password === ADMIN_PASS){
        admin = true;
        res.redirect('/admin/dashboard');
    }
    else{
        message.text = "Wrong Credentials!"; 
        message.shown = false;
        res.redirect('/admin/login');
    }
}

exports.getAdminDashboard = async (req,res,next) => {
    let approvals = await Approval.find({status: 'pending'});
    let aplist = [];
    for(ap of approvals){
        org = await Organization.findById(ap.organization);
        aplist.push({
            org: org,
            approval: ap
        })
    }
    res.render('admin/dashboard',{pageTitle:'Admin Dashboard',approvals: aplist});
}

exports.getOrganizationApprove = async (req,res,next) => {
    let org_id = req.params.organizationId;
    await Approval.findOneAndUpdate({organization: org_id}, {status:"approved"},{new: true});
    await Organization.findOneAndUpdate({_id: org_id},{approved: true, approvedDate: Date.now()},{new:true});
    res.redirect('/admin/dashboard');
}

exports.getOrganizationDecline = async (req,res,next) => {
    let org_id = req.params.organizationId;
    await Approval.findOneAndDelete({organization: org_id});
    await Organization.findOneAndDelete({_id: org_id});
    res.redirect('/admin/dashboard');
}