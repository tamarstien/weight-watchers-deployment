
const fs = require('fs');
const url='mongodb://localhost:27017'; 
const mongoose = require('mongoose');
const users=require('../mongo/Models/userModel');
let addUser2= async (user) => {
    if (user) {
        const connection = await mongoose.connect(url);
        debugger;
        const userNew=new users(user);
            await userNew.save();
        mongoose.disconnect();
    }
};

const data = fs.readFileSync('./data/users.json');
let dataUsers = JSON.parse(data);
const dataUser = dataUsers.users;

const saveToFile = async () => {
    const json = JSON.stringify(dataUsers)
    await fs.writeFileSync('./data/users.json', json,
        (err) => {
            if (err) throw err;
            console.log('Data written to file');
        });
}

module.exports = {
    getAllUsers: async () => {
        const connection = await mongoose.connect(url);
        const us = await users.find({});


        mongoose.disconnect();
        return us;

    },

    getUserById: async (id) => {
        const connection = await mongoose.connect(url);
        const u=await users.findOne({id:id});
        mongoose.disconnect();
        return u;
    },

    searchUserByParams: async (userName) => {
        if (userName) {
            const connection = await mongoose.connect(url);
            let user = await users.findOne({firstName: userName});
            mongoose.disconnect();
            return user;
        }
    },

    addUser: async (user) => {
        if (user) {
            const connection = await mongoose.connect(url);
            debugger;
            const userNew=new users(user);
                await userNew.save();
            mongoose.disconnect();
        }
    },
    // updateUser: async (id, user) => {
    //     if (user && id) {
    //         const connection = await mongoose.connect(url);
    //         const updateUser= await users.findOneAndUpdate({id:id,user:user},{ safe: true, upsert: true, new: true });
    //         // const indexUser = await dataUser.findIndex(user => user.id === id);
    //         // dataUser[indexUser] = user;
    //         // saveToFile();
    //         mongoose.disconnect();
    //     }
    // },
    removeUser: async (id) => {
        if (id) {
            const connection = await mongoose.connect(url);
            await users.deleteOne({id:id});
            mongoose.disconnect();
        }
    },
    searchUserByParams: async (fName, email) => {
        if (fName && email) {
            const indexSearch = dataUser.findIndex(user => user.firstName === fName && user.em);
            userSearch = dataUser[indexSearch];
            return await userSearch;
        }
    }
}
