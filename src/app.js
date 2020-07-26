require('dotenv').config()
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const session = require('express-session');
const MongoStore = require('connect-mongo')(session)
const mongoose = require('mongoose')
const passport = require('passport')
const discordStrategy = require('./strategies/discordstrategy')
const db = require('./database/database')
const path  = require('path')

db.then(() => console.log('Connected to MongoDB')).catch(err => console.log(err))


//Routes
const authRoute = require('./routes/auth')
const dashboardRoute = require('./routes/dashboard');
const { getMaxListeners } = require('process');
app.use(session({
    secret: 'some random secret',
    cookie: {
        maxAge: 60000 * 60 *24
    },
    saveUninitialized: false,
    resave: false,
    name: 'discord.oauth2',
    store: new MongoStore({ mongooseConnection: mongoose.connection})
}))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))


//passport
app.use(passport.initialize());
app.use(passport.session());


//Middleware Routes
app.use('/auth', authRoute);
app.use('/dashboard', dashboardRoute)


//tempURLs
app.get('/', isAuthorized, (req, res) => {
    res.render('home', {
        users: [
            { name: 'O', email: 'O@gmail.com'},
            { name: "L", email: 'L@gmail.com'},
            { name: 'B', email: 'lol@gmail.com'},
            { name: 'Y', email: 'why@gmail.com'}
        ]
    })
});

function isAuthorized(req, res, next) {
    if(req.user){ 
        console.log('User Logged in:')
       res.redirect('/dashboard')
    } else {
        console.log('User is not logged in')
        next()
    }
}

app.listen(PORT , () => {
    console.log('Now listening to ' + PORT)
});