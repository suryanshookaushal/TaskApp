const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userschema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    tokens:[{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer,
        default: ''
    }
})
userschema.virtual('lists', {
    name: 'List',
    localField: '_id',
    foreignField: 'owner',
})


//Hashing the password
userschema.pre('save', async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})
//Authenticating user
userschema.statics.findByCredentials = async(email, password)=>{
    const user = await User.findOne({email: email})
    if(!user){
       throw new Error("Invalid email")
    }
    const ismatch = await bcrypt.compare(password, user.password)
    if(!ismatch){
        throw new Error("Invalid Password")
    }
    return user
}
//Generate Tokens
userschema.methods.generateTokens = async function(){
    const user = this
    const token = jwt.sign({id: user._id}, 'thisismysecret')
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}



const User = mongoose.model('User',userschema)

module.exports = User