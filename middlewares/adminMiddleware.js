global.admin = false;

exports.authAdminMiddleware = (req,res,next) => {
    if(!admin){
        return res.redirect('/admin/login');
    }
    next();
}