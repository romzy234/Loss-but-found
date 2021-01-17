const { loss } = require("../config/nedb");
loss.loadDatabase();

exports.getHome = (req, res, next) =>{
    res.render('index');
}

exports.postReport = (req, res, next) =>{
    data = req.body

    loss.insert(data,(err, data)=>{
        console.log(data)
        res.end();
        if(err){
            console.log(err)
        }
    })
}

exports.getAdd = (req, res, next) =>{
    res.render('add');
}

exports.getTest = (req, res, next) =>{
    res.render('test');
}

exports.getTestApi = (req, res, next) =>{
    res.json([{"moro":"moro"}, {"moro":"moro1"},{"moro":"moro2"},{"moro":"moro3"}]);
}

exports.getSearch = (req, res, next) =>{
    res.render('search');
}

exports.postSearch = (req, res, next) =>{
    data = req.body
    console.log(data)
    res.render('search',{
        data: 11
    });
}