import {cartModel} from '../model/cart.model.js';

class CartMongooseDao{

    async createCart(cart) {
        console.log(cart);
        const document = await cartModel.create({products:cart});
        console.log(document);
        return  {
            id: document._id,
            products: document.products
        }
    }

    async findCartById (id){
        const document = await cartModel.findOne({_id:id});
        if (!document) return null;

        return {
            id: document._id,
            products: document.products
        }
    }

    async updateCart (id, data){
        const document = await cartModel.findOneAndUpdate({ _id: id }, data, { new: true})

        if(!document) return null;

        return {
            id: document._id,
            products: document.products
        }
    }

}

export default CartMongooseDao;