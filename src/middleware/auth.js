const express = require('express')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

const auth = async function(req, res, next){
    try{
        const token = req.cookies.newc
        if(!token){
           return res.redirect('/login')
        }
        const verify = jwt.verify(token, 'thisismysecret')
        if(!verify){
            return res.redirect('/login')
        }
        const userc = await User.findById({_id: verify.id})
        req.user = userc
        next()
    }
    catch(e){
        return res.redirect('/login')
    }
}

module.exports = auth