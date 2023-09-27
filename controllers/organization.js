const Approval = require('../models/approval');
const Organization = require('../models/organization');
const Country = require('../models/country');
const hashPassword = require('../utils/hash');
const bcrypt = require('bcrypt');

exports.getLogin = (req,res,next) => {
    res.render('login',{pageTitle: 'Login'});
    message.shown = true;
}

const login = async (email,password) => {
    try {
        const organization = await Organization.findOne({ email: email});
        if (!organization) {
            message.text = "Email Not Found!";
            message.shown = false;
            return false;
        }

        const match = await bcrypt.compare(password, organization.password);
        
        if (match) {
            return organization._id;
        }

        message.text = "Password Does Not Match";
        message.shown = false;
        return false;

    } catch (e) {
        console.log(e);
    }
}

exports.postLogin = async (req,res,next) => {
    const result = await login(req.body.email, req.body.password);
    if(result){
        req.session.organizationId = result;
        res.redirect('/organization/dashboard');
    }
    else{
        res.redirect('/organization/login');
    }
}

exports.getRegister = async (req,res,next) => {
    const countries = await Country.find({});
    res.render('register',{pageTitle: 'Register', countries: countries});
}

exports.postRegister = (req,res,next) => {
    let orgname = req.body.orgname;
    let country = req.body.country;
    let email = req.body.email;
    let password = req.body.password;
    hashPassword(password).then(async (hash)=>{
        let org = new Organization({
            name: orgname,
            country: country,
            email: email,
            password: hash
        });

        await org.save();
        message.text = "User have been created! Try to login..."
        message.type = "success";
        message.shown = false;
        res.redirect('/organization/login');
    })
}

exports.getVerify = (req,res,next) => {
    res.render('organization/verify',{pageTitle: "Verify"});
}

exports.postVerify = async (req,res,next) => {
    let org = organization._id;
    let country = organization.country;
    let address = req.body.orgaddress;
    let telephone = req.body.telephone;
    let docs_url = req.file.filename;
    let approval = new Approval({
        organization: org,
        country: country,
        address: address,
        telephone: telephone,
        docs_url: docs_url
    });
    await approval.save();
    res.redirect('/organization/dashboard');
}

exports.getLogout = async (req, res) => {
    req.session.destroy();
    global.organization = false;
    res.redirect('/');
}