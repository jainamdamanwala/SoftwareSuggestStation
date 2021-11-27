const express = require("express");
const { engine } = require('express-handlebars');
const app = express();
const cookieParser = require('cookie-parser');
const configRoutes = require('./routes');
app.use(cookieParser());
app.use(express.json());
//const exphbs = require('express-handlebars');
const session = require('express-session');

app.use(express.urlencoded({
    extended: true
}));
app.use("/public", express.static(__dirname + "/public"));
app.engine('handlebars', engine({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(
    session({
      name: 'AuthCookie',
      secret: "This is a secret.. shhh don't tell anyone",
      saveUninitialized: true,
      resave: false,
      cookie: { maxAge: 60000 }
    })
  );
app.use('/private', (req, res, next) => {
    if (!req.session.user) {
        res.status(403).render('login/login',{error:"User is not logged in into system !"});
    } else {
        next();
    }
});

app.use('/login', (req, res, next) => {
    if (req.session.user) {
        return res.redirect('/private');
    } else {
        next();
    }
});

app.use('/signup', (req, res, next) => {
    if (req.session.user) {
        return res.redirect('/');
    } else {
        next();
    }
});

app.use(async (req, res, next) => {
    //console.log(`[${new Date().toUTCString()}]: ${req.method} ${req.originalUrl}  ${isLoggedIn(req) ? '(Authenticated)' : '(Not Authenticated)'}`);
    const now = new Date();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1);

    res.cookie('lastAccessed', now.toString(), { expires: expiresAt });
    res.cookie('Shubham', 'Jiyani');
    next();
  });
const isLoggedIn = function (req) {
    return req.session.user;
};

configRoutes(app);
app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log('Your routes will be running on http://localhost:3000');
  });