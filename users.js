import { userModel } from "../models/userModel.js";
import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import env from 'dotenv';
env.config();

const createUser= async(req,res)=>{
    const {username,password,email}=req.body;
    console.log(username,password,email);
    const exists=await userModel.findOne({username:username});
    //console.log(exists) //check if a user exists
    try{
        if(exists===null){
            console.log(exists)
            const hashedpassword=await bcrypt.hash(password,10);//encrpt the raw password 
            console.log(hashedpassword)
            const user={
                username:username,
                password:hashedpassword,
                email:email
            }
            const create=await userModel.create(user);
            console.log(create)//create a user with the details provided
            res.send(`user created with username ${username}`)
        }
        else{
            throw new Error(`username already exists`,400)//if a user exists throw error.
        }
    }
    catch(err){
        res.render('error',{err});
    }
}

const loginUser=async(req,res)=>{
    const {username,password}=req.body;//destructure body contents
    const exists=await userModel.findOne({username:username});//find if user exists or not
    try{
        if(exists){
            if(await bcrypt.compare(password,exists.password)){//if exists compare the passwords of that user 
                const accessToken=jwt.sign({
                    username:username,
                    password:password,
                },process.env.SECRET,{expiresIn:"2m"})//sign in the user with 3 params payload,secret key, and  expires in
                const refreshToken=jwt.sign({
                    username:username,
                    password:password,
                },process.env.REFRESH_SECRET,{expiresIn:'10m'});
                res.cookie('accessToken', accessToken, {
                httpOnly: true,
                 // Set to false for HTTP (development)
                sameSite: 'lax', // Changed from 'None' for local development
                maxAge: 1 * 60 * 1000, // 15 minutes
                path: '/'
                });
                
                res.cookies('refreshToken', refreshToken, {
                httpOnly: true,
                 // Set to false for HTTP (development)
                sameSite: 'lax', // Changed from 'None' for local development
                maxAge: 3*60*1000, // 7 days
                path: '/'
                });
                
                res.json({
                    accessToken,
                    refreshToken
                });
            }
            else{
                throw new Error('Password incorrect... try again..');//throw and error
            }
        }
        else{
            throw new Error('User does not exists');//throw errrorr
        }
    }
    catch(err){
        res.send(err.message);//display error
    }
}

const veri=(req,res)=>{
    res.json({
        message:`you are a registered user ${req.user.username}`
    })
}
export {createUser,loginUser,veri};