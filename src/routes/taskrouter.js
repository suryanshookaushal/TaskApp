const express = require('express')
const List = require('../models/List')
const Task = require('../models/Task')
const auth = require('../middleware/auth')
const router = new express.Router()

router.get('/tasks/:id', auth, async(req, res)=>{
    try{
    const lists = await List.find({'owner': req.user._id})
    const id = req.params.id
    const tasks = await Task.find({'owner': id})
    res.render('tasks/dash', {lists, id, tasks})
    }
    catch(e){
        console.log(e)
        res.redirect('/tasks/'+req.params.id)
    }
})
router.get('/newtask/:id', auth, async(req, res)=>{
    const id = await req.params.id
    res.render('tasks/newtask', {id})
})
router.post('/newtask/:id', auth, async(req, res)=>{
    try{
    const task = new Task(req.body)
    task.owner = req.params.id
    task.userowner = req.user._id
    await task.save()
    res.redirect('/tasks/'+req.params.id)
    }
    catch(e){
        console.log(e)
        res.redirect('/tasks/'+req.params.id)
    }
})


module.exports = router