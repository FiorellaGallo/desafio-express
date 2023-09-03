import mongoose ,{Schema}from 'mongoose';
import randomstring from 'randomstring';
import moment from 'moment';


const ticketCollection = 'ticket';

const ticketSchema = new Schema({

    code: {type:Schema.Types.String,unique:true},
    purchaseDateTime: {type:Schema.Types.String},
    amount:{type:Schema.Types.Number},
    purchaser: {type:Schema.Types.String}
    
   
});

ticketSchema.pre('save', function (next) {
    if (!this.code) {
      this.code = randomstring.generate(8);
    }
    this.purchaseDateTime = moment().format('YYYY-MM-DD HH:mm:ss');
    next();
  });

export const ticketModel = mongoose.model(ticketCollection,ticketSchema);
