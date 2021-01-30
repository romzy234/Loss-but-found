exports.time = (req, res, next) => {
    const time = req.params.time;
     const now = Date.now();
     if (now - time < 300000){
         next();
         console.log(now - time + ' Not expired')
     }else{
        console.log(now - time + ' expired')
         return res.send('Expired link')
         // write condition
     }
 }
 