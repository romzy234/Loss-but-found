exports.getHome = (req, res, next) =>{
    res.render('index');
}

exports.postReport = (req, res, next) =>{
    data = req.body
    console.log(data)
    res.end();
}

exports.getAdd = (req, res, next) =>{
    res.render('add');
}