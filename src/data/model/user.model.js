import mongoose,{Schema} from 'mongoose';
import paginate from'mongoose-paginate-v2';

const userCollection = 'users';

const UserSchema = new Schema({
    firstName: {type:Schema.Types.String, required:true},
    lastName: {type:Schema.Types.String},
    email:{type:Schema.Types.String, unique:true, required:true},
    age: {type:Schema.Types.Number, default:18}, 
    password: {type:Schema.Types.String},
    cart: { type: mongoose.Schema.Types.ObjectId,index:true, ref:'cart'},
    role:{ type: mongoose.Schema.Types.ObjectId,index:true, ref:'role'},
    isAdmin: { type: Schema.Types.Boolean, default: false },
    documents:[{
        name:{type:Schema.Types.String},
        reference:{type:Schema.Types.String}
    }],
    lastConnection:{ type: Schema.Types.Date, default:Date.now}// VER ESTO ..AUN NO LO TERMINE
    

});

UserSchema.plugin(paginate);

export default mongoose.model(userCollection,UserSchema);
