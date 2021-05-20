const express = require('express')
const List = require('../models/List')
const Task = require('../models/Task')
const auth = require('../middleware/auth')
const router = new express.Router()

router.get('/tasks/:id', auth,async(req, res)=>{
    const lists = await List.find({'owner': req.user._id})
    const id = req.params.id
    res.render('tasks/dash', {id, lists})
})

module.exports = router