import mongoose from "mongoose";
import randomstring from 'randomstring';
import moment from "moment";


const ticketCollection = 'ticket'

const ticketSchema = new mongoose.Schema({

    code: {type:String,unique:true},
    purchaseDateTime: {type:String},
    amount:{type:Number},
    purchaser: {type:String}
    
   
})

ticketSchema.pre('save', function (next) {
    if (!this.code) {
      this.code = randomstring.generate(8);
    }
    this.purchaseDateTime = moment().format('YYYY-MM-DD HH:mm:ss');
    next();
  });

export const ticketModel = mongoose.model(ticketCollection,ticketSchema);
