const { json } = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { users } = require("../config/nedb");
users.loadDatabase();
const validPassword = require('../utils/passwordutils').validPassword;


const verifyCallback = (username, password, done) => {
    // console.log(username)
     users.findOne({ username: username },
        (err, user)=>{
            if (err) { return done(err); }

            if (!user) { return done(null, false); }
            
            const isValid = validPassword(password, user.hash, user.salt);
            // console.log( isValid)
            if (isValid) {
                return done(null, user) ;
            } else {
                return done(null, false);
            }
        })

}

const strategy  = new LocalStrategy(verifyCallback);

passport.use(strategy);
// console.log( verifyCallback + ' is True')

passport.serializeUser((user, done) => {
    done(null, user._id);
    // console.log( user)
});

passport.deserializeUser((id, done) => {
    users.findOne({_id:id}, (err, user)=>{
        done(null, user);
    })
});

// Finished