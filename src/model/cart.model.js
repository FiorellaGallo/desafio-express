import mongoose from "mongoose";

const cartCollection = 'cart'

const cartSchema = new mongoose.Schema({

    products: [
       {
        id: { type: String },
        quantity: { type: Number }
       }
    ]
    
})

export const cartModel = mongoose.model(cartCollection,cartSchema);