const user=require('../mongo/Models/userModel');
const userService=require('../services/User.service')
const {expect}= require('chai');
const sinon=require('sinon');

describe('user service',()=>{
it('findOne returns an user',async () => {
    const userObject={
        "id": "987654321",
        "firstName": "Tamar",
        "lastName": "Shteinmenezt",
        "phone": "0533110485",
        "email": "ts0533110485@gmail.com",
        "hight": "1.62",
        "meetings": [
            {
                "date": "12/06/2022",
                "weight": "80",
                "_id": "62d546bc7b9f61f73175f8ca"
            },
            {
                "date": "21/06/2022",
                "weight": "78.5",
                "_id": "62d546bc7b9f61f73175f8cb"
            },
            {
                "date": "28/06/2022",
                "weight": "80.3",
                "_id": "62d546bc7b9f61f73175f8cc"
            }
        ],
       
    }
    
    const id="987654321";

    sinon.stub(user, 'findOne').returns(userObject);
    const returnedUser = await userService.getUserById(id);

    expect(returnedUser.firstName).to.equal(userObject.firstName);
});
it("checks if the user has already  been deleted", async () => {
    

sinon.stub(user,'deleteOne').returns({
    "acknowledged": true,
    "deletedCount": 1
});
})
})





