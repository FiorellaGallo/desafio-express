import SessionManager from "../../domain/managers/user.js";
import CartManager from "../../domain/managers/carts.js";
import RoleManager from "../../domain/managers/role.js";

import { createHash, generateToken, isValidPassword } from "../../utils/index.js";


export const list = async  (req, res, next) =>{
  try{
    const { limit, page } = req.query;
    
    const manager = new SessionManager();

    const users = await manager.paginate({ limit, page });
   
    res.send({ status: 'success', users: users.docs, ...users, docs: undefined });
    
  }
  catch(e){
    next(e);
  }
    
};

export const save = async (req, res, next) =>{
  try{
    const { cartId ,roleId } = req.body;
    const manager = new SessionManager();
    const cartManager = new CartManager();
    const roleManager = new RoleManager();
    
    if (cartId) {
      const cart = await cartManager.getCartById(cartId);
      
      req.body.cart = cart._id
    }

    if (roleId) {
      const role = await roleManager.getOne(roleId); 
      req.body.role = role._id  
    }
    
    const user = await manager.create({
      ...req.body, password: await createHash(req.body.password)
    });
    res.send({ status: 'success', user, message: 'User created.' })

  }
  catch(e){
    next(e);
  }   
};

export const getOne = async (req, res, next) =>{
  try {
    const { id } = req.params;
    const manager = new SessionManager();
    const user = await manager.getOne(id);

    res.send({ status: 'success', user });
 
  } 
  catch (e) {
    next(e);
  }
        
};

export const update = async (req, res, next) =>{
  try {
    
    const { id } = req.params;
    const { cartId ,roleId } = req.body;
    const manager = new SessionManager();
    const cartManager = new CartManager();
    const roleManager = new RoleManager();

    if (cartId) {
      const cart = await cartManager.getCartById(cartId);
      req.body.cart = cart._id
    }

    if (roleId) {
      const role = await roleManager.getOne(roleId); 
      req.body.role = role._id  
    }
    
    const result = await manager.updateOne(id, req.body);
    
    res.send({ status: 'success', message: result })
  } 
  catch (e) {
    next(e)
    
  }  
};

export const deleteOne = async (req, res, next) =>{
  try {
    const { id } = req.params;
    const manager = new SessionManager();
    await manager.deleteOne(id);

    res.send({ status: 'success', message: 'User deleted.' })
  } 
  catch (e) {
    next(e);
  }
  
};

export const updateRol = async (req, res, next)=>{
  try{
    
    const { id } = req.params;
    const rolPremium = '64d7bf2aadfbef09839e84f6';
    const rolUser= '647fc202e1e0b1b4e346bc8b';

    const isPremium =req.body.premium; //premium es un flag(bandera) va a devolver true/false
    const result = await manager.updateOne(id,{role: isPremium ? rolPremium : rolUser});//utilce un operador ternario
    res.send({ status: 'success', message: result })
  }
  catch(e){
    next(e)
  }
};

export const addDocuments = async (req,res,next)=>{
  try {
    const manager = new SessionManager();
    const { id } = req.params;
    const data = req.body;
   
    const profileImages = req.files['profiles'];
    const productImages = req.files['products'];
    const documents = req.files['documents'];
    console.log(req.files);

    const archive = [];
    if (profileImages) {
      archive.push(...profileImages.map(file =>{ return { name:file.filename , reference: `http://localhost:8084/${file.path.replace("public/", "")}`}}));
    }

    if (productImages) {
      archive.push(...productImages.map(file =>{ return { name:file.filename , reference: `http://localhost:8084/${file.path.replace("public/", "")}`}}));
    }

    if (documents) {
      archive.push(...documents.map(file =>{ return { name:file.filename , reference: `http://localhost:8084/${file.path.replace("public/", "")}`}}));
    }
    console.log(productImages);
    data.reference = archive;
    const result = await manager.updateOne(id,{documents:archive});
    res.send({ status: 'success', message: result });
      
  } 
  catch (e) {
    next(e);
  }
}