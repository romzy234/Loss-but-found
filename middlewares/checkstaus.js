module.exports = (req,res,next)=>{
    if(req.isAuthenticated() && req.user.status == true){
        next()
    }else{
        res.redirect('/signin');
    }

}