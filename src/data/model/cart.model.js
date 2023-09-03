import mongoose,{Schema} from 'mongoose';

const cartCollection = 'cart';

const cartSchema = new Schema({

    products: [
        {
          _id: { type: Schema.Types.ObjectId,index:true, ref:"products"},
          quantity: {type:Schema.Types.Number}
        },
    ],  
  
});

export const cartModel = mongoose.model(cartCollection,cartSchema);