import jwt from 'jsonwebtoken';
import {NextFunction, Request, Response} from "express-serve-static-core";
const secret = require('../config/keys');

module.exports = (req:Request,res:Response,next:NextFunction) => {
  const token = req.header('auth-token');
  if(!token) return res.status(401).send('Access Denied');
  try{
      (req as any).user = jwt.verify(token,secret.secretOrKey);
      next();
  }catch (e) {
      res.status(400).send('Invalid Token ' + e);
  }
};