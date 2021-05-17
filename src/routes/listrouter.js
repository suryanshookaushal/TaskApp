const express = require('express')
const List = require('../models/List')
const auth = require('../middleware/auth')
const router = new express.Router()



router.get('/newlist', auth, async(req, res)=>{
    res.render('lists/newlist')
})
router.post('/newlist', auth,async(req, res)=>{
    try{
    const lists = new List(req.body)
    lists.owner = req.user._id
    await lists.save()
    res.redirect('/dashboard')
    }
    catch(e){
        console.log(e)
        res.status(500).send(e)
    }
})
router.get('/lists/:id', async(req, res)=>{
    try{
    const _id = req.params.id
    const listp = await List.findById({_id})
    res.send(listp)
    }
    catch(e){
        console.log(e)
        res.status(500).send(e)
    }
})
router.patch('/lists/:id', async(req, res)=>{
    try{
    const _id = req.params.id
    const listu = await List.findByIdAndUpdate({_id}, req.body, {new: true})
    res.send(listu)
    }
    catch(e){
        console.log(e)
        res.status(500).send(e)
    }
})
router.delete('/lists/:id', async(req, res)=>{
    try{
    const _id = req.params.id
    const listd = await List.findById({_id})
    await listd.remove()
    res.redirect('/dashboard')
    }
    catch(e){
        console.log(e)
        res.redirect('/dashboard')
    }
})

module.exports = router