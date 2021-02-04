var crypto = require('crypto');

function genHash(password) {
    var salt = crypto.randomBytes(32).toString('hex');
    var genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
   // console.log(salt + " ," + genHash +  " ," + Date.now());
    return {
      salt: salt,
      hash: genHash
    };
}

function validHash(password, hash, salt) {
    var hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
   // console.log(hash === hashVerify);
    return hash === hashVerify;
}

module.exports.validHash = validHash;
module.exports.genHash = genHash;


// genPassword('cyril is A GOOD');

// validPassword('cyril is A GOOD', '33e786eb3316aa699f7a32c176a5c36a469ccb500a2d3db23d79700a32a8779a9c52220f1ba26e5951ffb6c11efe5cdfa80c29e3edc3831a3f75189f9624fe3b','9e419fce25f4d43a24a475949d51ab689834dc022b7145683cc3488750fcf1e8')