const express = require('express')
const User = require('../models/User')
const List = require('../models/List')
const Task = require('../models/Task')
const auth = require('../middleware/auth')
const multer = require('multer')
const storage = multer.memoryStorage()
const router = new express.Router()


router.get('/', (req, res)=>{
    res.redirect("/signup")
})
router.get('/signup', (req, res)=>{
    res.render("signup")
})
router.get('/login', (req, res)=>{
    res.render("login")
})
router.post('/logout', (req, res)=>{
    try{
        res.clearCookie("newc");
        res.redirect('/signup');
    }
    catch(e){
        console.log(e)
        res.redirect('/dashboard');
    }
})
router.get('/dashboard', auth, async(req, res)=>{
    var msg = req.query.mesg;
    req.query = ""
    const lists = await List.find({'owner': req.user._id})
    res.render('dashboard', {lists, msg})
})
router.post('/signup', async(req, res)=>{
    try{
        const users = new User(req.body)
        const token = await users.generateTokens()
        await users.save()
        res.cookie("newc", token, {
            expires: new Date(Date.now() + 900000),
            httpOnly: true
        })
        res.redirect('dashboard');
        }
        catch(e){
            console.log(e)
            res.status(500).send(e)
        }
})
router.post('/login',async(req, res)=>{
    try{
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateTokens()
    res.cookie("newc", token, {
        expires: new Date(Date.now() + 900000),
        httpOnly: true
    })
    res.redirect('dashboard');
    }
    catch(e){
        console.log(e)
        res.render("login", {err_msg: "Invalid username or password"});
    }
})
//Profile page for user
router.get('/profile', auth, async(req, res)=>{
    try{
        const user =  req.user
        const fileContents = user.avatar.toString('base64')
        const count = await List.count({owner: user._id})
        const taskst = await Task.count({userowner: req.user._id}) 
        res.render('profile/profile.ejs', {user, fileContents, count, taskst})
    }
    catch(e){
        console.log(e)
        res.redirect('/dashboard')
    }
})
router.patch('/users/me', auth, async(req, res)=>{
    const updates = Object.keys(req.body)
    const allowed = ['name', 'email', 'password']
    const isvalid = updates.every((update)=>{
        return allowed.includes(update)
    })
    if(isvalid==false){
        res.status(400).send('ERROR: Invalid update!')
    }
    else{
    try{
        updates.forEach((update)=>{
            req.user[update] = req.body[update]
        })
        await req.user.save()
        console.log("Updated")
        res.send(req.user)
    }
    catch(e){
        res.status(500).send(e)
        console.log(e)
    }
}
})
router.delete('/users/me', auth,async(req, res)=>{
    try{
        const userd = req.user
        await userd.remove()
        res.send(userd)
    }
    catch(e){
        console.log(e)
        res.status(500).send(e)
    }
})

const upload = multer({
    dest: 'profile',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpeg|jpg|png)$/)){
            return cb(new Error("You can only upload jpg, png, jpeg formats"))
        }
        cb(undefined, true)
    },
    storage
})

router.post('/profile', auth, upload.single('myfile'), async(req, res)=>{
    req.user.avatar = req.file.buffer
    await req.user.save()
    res.redirect('/profile')
}, (error, req, res, next)=>{
    console.log(error)
    res.redirect('/profile')
})

router.delete('/profile', auth, async(req, res)=>{
    req.user.avatar = ''
    await req.user.save()
    res.redirect('/profile')
})


module.exports = router