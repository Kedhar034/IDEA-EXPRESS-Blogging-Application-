// checkswhether the user.eq exists  or not
// checks the token  of  req and res

const {validatetoken} =  require("../service/authentication")

function checkforAuthenticationcookie(cookieName){
    return  (req,res,next)=>{
        const  tokenCookievalue = req.cookies[cookieName];
        if(!tokenCookievalue){
            return next();
        } 
        try {
            const  userpayload = validatetoken(tokenCookievalue);
            req.user=userpayload;
        } catch (error) {}
        
        return next();  
    };
}

module.exports = {
    checkforAuthenticationcookie,
}
