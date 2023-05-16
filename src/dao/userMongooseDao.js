import { Error } from 'mongoose';
import userSchema from '../model/user.model.js';

class UserMongooseDao{

    async create (data){
        const userDocument = await userSchema.create(data);
        return{
            id: userDocument._id,
            firstName: userDocument.firstName,
            lastName: userDocument.lastName,
            email: userDocument.email,
            age: userDocument.age, 
            password: userDocument.password
        }
    }

    async getOne(id){
        const userDocument = await userSchema.findOne({_id:id});
        if (!userDocument) throw new Error('User dont exit.');
        return{
            id: userDocument?._id,
            firstName: userDocument?.firstName,
            lastName: userDocument?.lastName,
            email: userDocument?.email,
            age: userDocument?.age, 
            password: userDocument?.password 
        }
    }

    async getOneByEmail(email){
        const userDocument = await userSchema.findOne({email})
        if (!userDocument) throw new Error('User dont exit.');
        return{
            id: userDocument?._id,
            firstName: userDocument?.firstName,
            lastName: userDocument?.lastName,
            email: userDocument?.email,
            age: userDocument?.age, 
            password: userDocument?.password 
        } 
    }

    async updateOne(id,data){
        const userDocument = await userSchema.findByIdAndUpdate({_id:id},data,{new:true});
        if (!userDocument) throw new Error('User dont exit.');
        return{
            id: userDocument._id,
            firstName: userDocument.firstName,
            lastName: userDocument.lastName,
            email: userDocument.email,
            age: userDocument.age,      
        }
    }

    async delete0ne(id){
        return userSchema.deleteOne({_id:id});
    }

}

export default UserMongooseDao;