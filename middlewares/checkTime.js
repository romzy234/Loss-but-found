exports.time = (req, res, next) => {
    const time = req.params.time;
     const now = Date.now();
 
     if (now - time < 300000){
         next();
     }else{
         return res.status(500)
         // write condition
     }
 }
 