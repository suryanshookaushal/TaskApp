const express = require('express')
const List = require('../models/List')
const auth = require('../middleware/auth')
const router = new express.Router()



router.get('/newlist', auth, async(req, res)=>{
    res.render('lists/newlist')
})
router.post('/newlist', auth,async(req, res)=>{
    try{
    const list = new List(req.body)
    list.owner = req.user._id
    await list.save()
    const mesg = "List succesfully saved"
    res.redirect('/dashboard?mesg=' + mesg)
    }
    catch(e){
        console.log(e)
        res.redirect('/dashboard')
    }
})
router.delete('/deletelist/:id', async(req, res)=>{
    const _id = req.params.id
    try{
        const list = await List.findByIdAndDelete({_id})
        const mesg = "List Succesfully deleted"
        res.redirect('/dashboard?mesg='+mesg)
    }
    catch(e){
        console.log(e)
        res.redirect('/dashboard')
    }
})


module.exports = router