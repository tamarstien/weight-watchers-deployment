// const MongoClient=require('mongodb').MongoClient;

const url='mongodb://localhost:27017'; 

// const client = new MongoClient(url);


const mongoose = require('mongoose');
const users=require('../mongo/Models/userModel');
async function connect()
{
    const connection = await mongoose.connect(
        url
        ); 
         

    const u1=new users({
        "id": "7234",
        "firstName": "Tamar",
        "lastName": "Raizner",
        "address": {
          "city": "Modin",
          "street": "Akiva",
          "number": 7
        },
        "phone": "089763019",
        "email": "y@gmail.com",
        "hight": 1.3,
        "meetings": [
          {
            "date": "12/03/2022",
            "weight": 60
          },
          {
            "date": "12/03/2022",
            "weight": 59.1
          },
          {
            "date": "12/03/2022",
            "weight": 57.2
          }
        ]
      })
    //   const u2=await users.findById("62d44b29d1c8482c94b257e2");
    //   console.log(u2)
     await u1.save();
   mongoose.disconnect();
}

connect();