const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;   
const bcryptjs = require('bcryptjs');
const { response } = require('express');
const saltRounds = 10;

let exportedMethods = {

    async get(id) {
        //console.log(id);
        var mongoose = require('mongoose');
        var objectId = mongoose.Types.ObjectId(id);
        const userCollection=await users();
        const user=await userCollection.findOne({_id:objectId});
        //console.log(user);
        return user;
    },

    async createUser(username, password) {
        
        const userCollection = await users();
        const name=username.toLowerCase();
        if(!username || !password){
            // response.render(signup,{error:"Enter Username and Password !"});
            throw "Enter Username and Password !"
        }
        if (!username.match(/^[A-z0-9]{4,}$/)) {
            //response.render(signup,{error:"UserName is not valid !"});
            throw "UserName is not valid !"
        }
        if (!password.match(/^["/.,<>?!@#$%:'"~^(){};*`&a-zA-Z0-9]{6,}$/)) {
            //response.render(signup,{error:"Password is not valid !"});
            throw "Password is not valid !"
        }
        
        const user=await userCollection.findOne({username: name});
        
        if (!user) {
            //console.log("d");
            const userCollection = await users();
            const pass = await bcryptjs.hash(password, saltRounds);
            const newUser = {
                username: name,
                password: pass
            };
            //console.log(newUser);
            const insertInfo = await userCollection.insertOne(newUser);
            const id = insertInfo.insertedId;
            //console.log(id);
            return await this.get(id);
        } else {
            //response.render('signup',{error:"User is already exist in the system !"});
            throw "User is already exist in the system !"
        }
    },
    async checkUser(username, password) {
        const userCollection = await users();
        const name=username.toLowerCase();
        if(!username || !password){
            throw "Enter Username and Password !"
        }
        if (!username.match(/^[A-z0-9]{4,}$/)) {
            throw "UserName is not valid !"
        }
        if (!password.match(/^["/.,<>?!@#$%:'"~^(){};*`&a-zA-Z0-9]{6,}$/)) {
            throw "Password is not valid !"
        }
        const user=await userCollection.findOne({username: name})
        if (!user) {
            throw "Either Username or Password is not valid !"
        }
        let temp = await bcryptjs.compare(password, user.password);
        if(!temp){
            throw "Either Username or Password is not valid "
        }
        return temp;
    }
}

module.exports = exportedMethods;