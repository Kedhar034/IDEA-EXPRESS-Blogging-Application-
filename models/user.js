const { randomBytes, createHmac } = require("crypto");
const {Schema,model} = require("mongoose");
const {createtokenforUser,validatetoken} = require("../service/authentication")

const userSchema = new Schema({
    fullname:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique  : true,
    },
    salt:{
        type: String,
    },
    password:{
        type: String,
        required: true,
    },
    imageUrl:{
        type: String,
        default:"public/default.jpg"
    },
    role:{
        type:String,
        enum:['USER','ADMIN'],
        dafult:"USER",
    }
},{timestamps:true});

userSchema.pre("save",function (next){
    const user = this;

    if (!user.isModified("password")) return;

    const salt = randomBytes(16).toString();
    const hashpass = createHmac("sha256",salt).update(user.password).digest("hex");

    this.salt=salt;
    this.password=hashpass;

    next();
});

userSchema.static("matchPasswordandGeneratetoken", async function (email,password) {
    const user = await this.findOne({email});
    if (!user) throw new Error("User not  found");

    const salt = user.salt;
    const hashpass = user.password;

    const userProvidedhass = createHmac("sha256",salt).update(password).digest("hex");

    if (hashpass !== userProvidedhass) throw new Error("Incorrect Password");

    const token = createtokenforUser(user);
    return token;
    
})

 
const User = model("User",userSchema);

module.exports = User;