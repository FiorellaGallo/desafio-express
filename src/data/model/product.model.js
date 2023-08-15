import mongoose from "mongoose";


const productCollection = 'products'

const productSchema = new mongoose.Schema({

    title: {type:String},
    description: {type:String},
    price:{type:Number},
    thumbnail: {type:String},
    code: {type:String},
    stock: {type:Number},
    category: {type:String},
    owner: {type:String, default:"Admin"}// se agrega nueva propiedad
   
})

export const productModel = mongoose.model(productCollection,productSchema);
