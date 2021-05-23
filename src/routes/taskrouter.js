const express = require('express')
const List = require('../models/List')
const Task = require('../models/Task')
const auth = require('../middleware/auth')
const router = new express.Router()

//Getting all the tasks
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
//Loading the form for new task
router.get('/newtask/:id', auth, async(req, res)=>{
    const id = await req.params.id
    res.render('tasks/newtask', {id})
})
//Adding a new task
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
//Deleting a particular task
router.delete('/deletetask/:owner/:id', auth, async(req, res)=>{
    const _id = req.params.id
    const own = req.params.owner
    try{
        const task = await Task.findById(_id)
        await task.remove()
        res.redirect('/tasks/'+own)
    }
    catch(e){
        console.log(e)
        res.redirect('/tasks/'+own)
    }
})
//Loading the form for updating a task
router.get('/updatetask/:owner/:id', auth, async(req, res)=>{
    const own = req.params.owner
    const id = req.params.id
    const task =  await Task.findById({_id: id})
    res.render('tasks/update', {own, id, task})
})
//Update the task
router.patch('/updatetask/:owner/:id', auth, async(req, res)=>{
    const _id = req.params.id
    const owner = req.params.owner
    try{
    const task = await Task.findByIdAndUpdate({_id}, req.body, {new: true})
    res.redirect('/tasks/'+owner)
    }
    catch(e){
        console.log(e)
        res.redirect('/tasks/'+owner)
    }
})





module.exports = router