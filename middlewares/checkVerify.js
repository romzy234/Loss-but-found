module.exports = (req,res,next)=>{
    if(req.isAuthenticated() && req.user.verified == true){
        next()
    }else{
        res.redirect('/Verify');
    }

}