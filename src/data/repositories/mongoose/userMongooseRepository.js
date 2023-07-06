import { Error } from 'mongoose';
import userSchema from '../../model/user.model.js';
import User from '../../../domain/entities/user.js';
import Carts from '../../../domain/entities/carts.js';
import Role from '../../../domain/entities/role.js';

class UserMongooseRepository{

    async paginate(criteria){
      const { limit, page } = criteria;
      const userDocuments = await userSchema.paginate({}, { limit, page });
      const { docs, ...pagination } = userDocuments;
      
    
      const users = docs.map(document =>  new User ({
        id: document._id,
        firstName: document.firstName,
        lastName: document.lastName,
        email: document.email,
        age: document.age,
        cart: document.cart?new Carts(
            document.cart._id,
            document.cart.products
        ):null,
        isAdmin:document?.isAdmin,
        role:document.role? new Role(
            document.role._id,
            document.role.name,
            document.role.permissions
        ):null
       
        
    }));
   
        return{
            users,
            pagination
           
        }
    }

    async create (data){
        const userDocument = await userSchema.create(data);
        console.log(data);
        return new User({
            id: userDocument._id,
            firstName: userDocument.firstName,
            lastName: userDocument.lastName,
            email: userDocument.email,
            age: userDocument.age, 
            password: userDocument.password,
            cart: userDocument?.cart,// id carrito
            role:userDocument?.role ,// id rol
            isAdmin:userDocument?.isAdmin
        })
    }

    async getOne(id){
        const userDocument = await userSchema.findOne({_id:id}).populate('cart').populate('role');
        console.log(userDocument);
        if (!userDocument) throw new Error('User dont exit.');
        return new User({
            id: userDocument?._id,
            firstName: userDocument?.firstName,
            lastName: userDocument?.lastName,
            email: userDocument?.email,
            age: userDocument?.age, 
            password: userDocument?.password,
            cart: userDocument?.cart,
            role:userDocument?.role,
            isAdmin:userDocument?.isAdmin
        })
    }

    async getOneByEmail(email){
        const userDocument = await userSchema.findOne({email}).populate('cart').populate('role');
        if (!userDocument) throw new Error('User dont exit.');
        return new User({
            id: userDocument?._id,
            firstName: userDocument?.firstName,
            lastName: userDocument?.lastName,
            email: userDocument?.email,
            age: userDocument?.age, 
            password: userDocument?.password,
            cart: userDocument?.cart,
            role:userDocument?.role,
            isAdmin:userDocument?.isAdmin
        }) 
    }

    async updateOne(id,data){
        const userDocument = await userSchema.findByIdAndUpdate({_id:id},data,{new:true});
        if (!userDocument) throw new Error('User dont exit.');
        return new User({
            id: userDocument._id,
            firstName: userDocument.firstName,
            lastName: userDocument.lastName,
            email: userDocument.email,
            age: userDocument.age,
            cart: userDocument?.cart,// id cart
            role:userDocument?.role ,     // id role
            isAdmin:userDocument?.isAdmin
        })
    }

    async deleteOne(id){
        return userSchema.deleteOne({_id:id});
    }

}

export default UserMongooseRepository;