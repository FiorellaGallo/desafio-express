import { cartModel } from '../../model/cart.model.js';
import Carts from '../../../domain/entities/carts.js';
import { loggers } from 'winston';

class CartMongooseRepository {

    async createCart(cart) {
        console.log( 'este es el carrito',cart);
        const document = await cartModel.create({ products: cart });
        console.log(document);
        
        return new Carts({
            id: document._id,
            products: document.products.map(product => ({
                product: product._id,
                quantity: product.quantity
            })),
        });
    }

    async findCartById(id) {
        const document = await cartModel.findOne({ _id: id }).populate("products._id");

        if (!document) return null;
        console.log(document);

        return new Carts({
            id: document._id,
            products: document.products.map(product => ({
                product: product._id,
                quantity: product.quantity
            })),

        });
    }

    async updateCart(idCart, idProduct) {
        let document = await cartModel.findOneAndUpdate(
            { _id: idCart, 'products._id': idProduct },
            { $inc: { 'products.$.quantity': 1 } },
            { new: true }
        );

        if (!document) {
            document = await cartModel.findOneAndUpdate(
                { _id: idCart },
                { $push: { products: { _id: idProduct, quantity: 1 } } },
                { new: true }
            );
        }

        if (!document) return null;

        return new Carts({
            id: document._id,
            products: document.products.map(product => ({
                product: product._id,
                quantity: product.quantity
            })),

        });
    }

    async deleteProduct(cid, pid) {
        const document = await cartModel.findOneAndUpdate(
            { _id: cid },
            { $pull: { products: { _id: pid } } },
            { new: true }
        );
        
        if (!document) return null;

        return new Carts({
            id: document._id,
            products: document.products.map(product => ({
                product: product._id,
                quantity: product.quantity
            })),

        });
    };

    async deleteAllProducts(cid) {
        console.log(cid);
        const document = await cartModel.findOneAndUpdate(
            { _id: cid },
            { $pull: { products: {} } },
            { new: true }
        );
        if (!document) return null;
            console.log(document);
        return new Carts({
            id: document._id,
            products: document.products.map(product => ({
                product: product._id,
                quantity: product.quantity
            })),

        });
    };

    async changeProducts(cid, data) {
        const document = await cartModel.findOneAndUpdate(
            { _id: cid },
            { $set: { products: data } },
            { new: true },
        );

        if (!document) return null;

        return new Carts({
            id: document._id,
            products: document.products.map(product => ({
                product: product._id,
                quantity: product.quantity
            })),

        });
    };

    async newQuantity(cid, pid, quantity) {
        const document = await cartModel.findOneAndUpdate(
            { _id: cid, 'products._id': pid },
            { $set: { 'products.$.quantity': quantity } },
            { new: true },
        );

        if (!document) return null;

        return new Carts({
            id: document._id,
            products: document.products.map(product => ({
                product: product._id,
                quantity: product.quantity
            })),

        });


    };

};

export default CartMongooseRepository;