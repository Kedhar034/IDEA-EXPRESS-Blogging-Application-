// to create the jwt tokens we can create a external service

const JWT = require("jsonwebtoken");
const  secret = "Supermanbatman@11";


//create the token for the user 
function createtokenforUser(user){
    const payload ={
        _id: user._id,
        email:user.email,
        imageUrl:user.imageUrl,
        role:user.role,
    };
    const token  =  JWT.sign(payload,secret);
    return token;
}

// token will get validated
function validatetoken(token){
    const payload = JWT.verify(token,secret);
    return payload;
}


module.exports={
    validatetoken,
    createtokenforUser,
}