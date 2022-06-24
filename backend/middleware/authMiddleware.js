import jwt, { decode } from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const protect = asyncHandler(async (req, res, next) => {
  let token

  if ( req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1] 

      const decoded = jwt.verify(token, process.env.JWT_SECRET)
        //decodare token 
        //split inseamna decodare fara spatiu
       req.user = await User.findById(decoded.id).select('-password')
      next()
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('Neautorizat!, tokenul nu este corect.')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Neautorizat! Nu a fost găsit nici un token.')
  }
})

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Neautorizat! Doar adminul poate vedea utilizatorii')
  }
}

export { protect, admin }

