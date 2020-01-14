const express = require("express");
const bodyParser = require("body-parser");
const app = express();
let cors = require('cors');
const knex = require('knex');
const bcrypt = require("bcrypt-nodejs");
const register = require("./controllers/register");
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'P@ssw0rd123',
        database: 'SmartBrain'
    }
});
// let usersData = db.select('*').from('users');
// usersData.then(data => console.log(data));


app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => { res.send("Welcome to Smart Brain API"); })

app.post("/signin", signin.handleSignin(db, bcrypt));
app.post("/register", register.handleRegister(db, bcrypt));
app.get("/profile/:id", profile.handleProfileGet(db));
app.put("/image", image.handleImage(db));
app.post("/imageurl", image.handleAPiCall());

// app.post("/signin", (req, res) => signin.handleSignin(req, res, db, bcrypt));
// app.post("/register", (req, res) => register.handleRegister(req, res, db, bcrypt));
// app.get("/profile/:id", (req, res) => profile.handleProfileGet(req, res, db));
// app.put("/image", (req, res) => image.handleImage(req, res, db));


app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on ${process.env.PORT}`);
})


