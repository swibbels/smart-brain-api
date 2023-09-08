const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0

const db = require('knex')({
    DATABASE_URL: 'postgres://bxvgovjnsslpzg:772d520e790fd24b93f9ee4713a1d70bfe0e371295a69dbcc8bc85a0d17c7615@ec2-52-205-171-232.compute-1.amazonaws.com:5432/d22vvuhcdl1avh',
    client: 'pg',
    connection: {
        connection: db.DATABASE_URL,
        ssl: true
    }
});

const register = require('./controllers/register')
const signIn = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const app = express();
app.use(bodyParser.json());


app.get('/', (req, res) => {res.send('success');})

app.post('/signin', (req, res) => { signIn.handleSignIn(req, res, db, bcrypt) })

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })

app.put('/image', (req,res) => { image.handleImage(req, res, db) }) 

app.post('/imageurl', (req,res) => { image.handleApiCall(req, res) }) 

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
})

