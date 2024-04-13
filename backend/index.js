const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const session = require('express-session')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
require('dotenv').config()

const corsOptions = {
  origin: 'http://127.0.0.1:3000',//Replace with your client's origin
  credentials: true,//this allows the server to accept cookies from the client
}
// app.use(cors(corsOptions))

app.use(cors())
app.use(bodyParser.json())

app.use(session({
  secret: 'secretKey007',
  resave: false,//Don't resave session if it hasn't changed
  saveUninitialized: false //Don't create a session until sth is stored
}))

app.use(passport.initialize())
app.use(passport.session())

mongoose.connect(
  // 'mongodb://127.0.0.1:27017/myHikingApp',
  process.env.URL,
  {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
  })

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', function () {
  console.log('Connected to the database')
})

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  province: String,
})
const User = mongoose.model('User', UserSchema)

const TourSchema = new mongoose.Schema({
  id: String,
  title: String,
  city: String,
  trailLength: Number,
  maxGroupSize: Number,
  desc: String,
  // photo: tourImg01,
  photo: String,
  featured: Boolean,
})
const Tour = mongoose.model('Tour', TourSchema)

const TripConfirmedSchema = new mongoose.Schema({
  name: String,
  numOfPeople: Number,
  phone: String,
  email: String,
  date: Date
})
const TripConfirmed = mongoose.model('TripConfirmed', TripConfirmedSchema)

passport.use(new LocalStrategy(
  async (username, password, done) => {
    console.log('in Local Strategy', username)
    try {
      const user = await User.findOne({ username })
      if (!user) {
        return done(null, false)
      }
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user)
      } else {
        return done(null, false)
      }
    } catch (err) {
      done(err)
    }
  }
))

passport.serializeUser((user, done) => {
  console.log("ID in serialize: ", user)
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  console.log("ID in deserialize: ", id)
  try {
    const user = await User.findById(id)
    done(null, user)
  } catch (err) {
    done(err, null)
  }
})

app.post('/register', async (req, res) => {
  try {
    console.log("request landed")
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = new User({ username: req.body.username, password: hashedPassword, email: req.body.email, province: req.body.province })
    await user.save()
    console.log("User registered")
    res.status(201).send('User registered')
  } catch (err) {
    res.status(500).send('Error registering new user')
  }
})

app.post('/login', passport.authenticate('local'), (req, res) => {
  console.log("Login Successful")
  res.send('Logged in')
})

app.get('/logout', (req, res) => {
  req.logout()
  console.log("User Logged out!")
  res.send('Logged out')
})

app.get('/trips/:id', async (req, res) => {
  const id = req.params.id
  console.log('trying to get tour data in DB')
  try {
    const tour = await Tour.findOne({ id })
    if (!tour) {
      return res.status(404).json({ error: 'Tour not found' })
    } else {
      return res.json(tour)
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

app.post('/booking', async (req, res) => {
  try {
    const tripConfirmed = new TripConfirmed({ name: req.body.name, numOfPeople: req.body.numberOfPeople, phone: req.body.phoneNumber, email: req.body.email, date: req.body.date })
    await tripConfirmed.save()
    console.log("Trip confirmed by user added to the DB")
    res.status(201).send('Trip confirmed and added to DB')
  } catch (err) {
    res.status(500).send('Error adding trip confirmed to DB')
  }
})

const PORT = 3006

app.get('/sessionCheck', (req, res) => {
  console.log(req.session)
  console.log(req.user)
  console.log('Is authenticated:', req.isAuthenticated())
  res.send('Check your server logs for the session details and user info')
})

app.listen(PORT, () => console.log(`Server running on port->${PORT}`))
