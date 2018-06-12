const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {

  const token = req.headers.authorization.split(" ")[1];
  try {
      const decoded = jwt.verify(token, "secret")

      req.UserData = decoded;
        next();
  } catch (error){
    return res.status(401).json({
      message: 'Error: Auth failed'
    })
  }

}
