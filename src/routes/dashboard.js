const router = require('express').Router()



function isAuthorized(req, res, next) {
    if(req.user){ 
        console.log('User Logged in:')
        console.log(req.user)
        next()
    } else {
        console.log('User is not logged in')
        res.redirect('/')
    }
}
router.get('/' , isAuthorized, (req, res) => { 
    res.render('dashboard', {
        username: req.user.username,
        discordId: req.user.discordId,
        guilds:req.user.guilds
    })
})
router.get('/commands' , isAuthorized, (req, res) => { 
    res.render('Commands', {
        username: req.user.username,
        discordId: req.user.discordId,
        guilds:req.user.guilds
    })
})

module.exports = router