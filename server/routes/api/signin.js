const User = require('../../models/User');
const UserSession = require('../../models/UserSession');
const jwt = require('jsonwebtoken');
const CheckAuth = require('../../models/check-auth');
const passport = require('passport')

module.exports = (app) => {


  app.post('/api/account/signup', (req, res, next) => {
    const { body } = req;
    const { firstName, lastName, password } = body;
    let { email } = body;
    //
    if(!firstName){
      return res.json({
        success: false,
        message: 'Error error in First name the server'
      })
    }
    if(!lastName){
      return res.json({
        success: false,
        message: 'Error error in Last name the server'
      })
    }
    if(!email){
      return res.json({
        success: false,
        message: 'Error error in Email the server'
      })
    }
    if(!password){
      return res.json({
        success: false,
        message: 'Error error in Password the server'
      })
    }



    email = email.toLowerCase();

    User.find({
      email: email
    }, (err, previousUsers) => {
      if(err) {
        return res.send({
          success: false,
          message: 'Error server'
        })
      }
      else if(previousUsers.length >= 1){
        return res.status(409).send({
          success: false,
          message: 'Error: Account already exist'
        })
      }

      const newUser = new User();
      newUser.email = email;
      newUser.firstName = firstName;
      newUser.lastName = lastName;
      newUser.password = newUser.generateHash(password);
      newUser.save((err, user) => {
        if(err){
          return res.status(500).send({
            success: false,
            message: 'Error server'
          })
        }
        return res.status(201).send({
          success: true,
          message: 'Signed up'
        })
      })
    })

  });

  app.post('/api/account/signin', (req, res, next) => {
    const { body } = req;
    const { password } = body;
    let { email } = body;

    if(!email){
      return res.status(401).send({
        success: false,
        message: 'Error error in Email the server'
      })
    }
    if(!password){
      return res.status(401).send({
        success: false,
        message: 'Error error in Password the server'
      })
    }
    email = email.toLowerCase();

    User.find({ email: email}, (err, users) => {
      if(err){
        return res.send({
          success: false,
          message: 'Error: server'
        })
      }
      if(users.length < 1){
        return res.status(401).send({
          success: false,
          message: 'Error Wrong password or email'
        })
      }
      // const user = new User()
      const user = users[0];
      // console.log(user)
      const userfield = {
          firstName: user.firstName,
          lastName: user.lastName,
          isDeleted: user.firstName,
          id: user._id,
      }
      // req.session.user = user;


      if(!user.validPassword(password)){
        return res.send({
          success: false,
          message: 'Error something is not valid in user.validPassword the server'
        })
      }

      const userSession = new UserSession();
      // userSession.userId = user._id;
      // const newId = userSession.userId;
      const token = jwt.sign(
        { email: email, userId: user._id },
        'secret', { expiresIn: "1h" }
      )
      userSession.userId = token;
      // console.log(users.id)


      userSession.save((err, doc) => {
        // console.log(doc)
        if(err){
          return res.send({
            success: false,
            message: 'Error: server'
          })
        }
        return res.send({
          success: true,
          message: 'Valid sign in',
          // user: userfield,
          token: doc.userId
        })
      })
    })

  });

  app.post('/api/account/verify', (req, res, next) => {
    const { query } = req;
    const { token } = query;

    UserSession.find({
      _id: token,
      isDeleted: false
    }, (err, sessions) => {
      if(err){
        return res.send({
          success: false,
          message: 'Error: server error'
        })
      }
      if(sessions.length != 1){
        return res.send({
          success: false,
          message: 'Error: server error'
        })
      } else {
        return res.send({
          success: true,
          message: 'Good'
        })
      }
    })
  });

  app.get('/api/account/logout', (req, res, next) => {
    const { query } = req;
    const { token } = query;

    UserSession.findOneAndUpdate({
      _id: token,
      isDeleted: false
    }, {
      $set: {isDeleted: true}
    }, null, (err, sessions) => {
      if(err){
        return res.send({
          success: false,
          message: 'Error: server error'
        })
      }
      return res.send({
        success: true,
        message: 'Good'
      })
    })
  });

  //getting one user
  app.get('/api/user/:id', (req, res, next) => {

    User.findById(req.params.id)
    .select('-password')
    .exec()
    .then((doc) =>{
      console.log(doc)
      if(!doc){ return res.status(404).end(); }
      return res.status(200).json(doc)
    })
    .catch(err => next(err));
  });



  app.get('/api/dashboard', passport.authenticate('jwt', { session: false }), (req, res, next) => {

    User.findById(req.UserData.userId)
    .select('-password')
    .exec()
    .then((doc) =>{
      // console.log(doc)
      if(!doc){ return res.status(404).end(); }
      return res.status(200).json(doc)
    })
    .catch(err => next(err));
  });



};
