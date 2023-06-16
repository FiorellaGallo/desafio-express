import SessionManager from "../../domain/managers/user.js";
import CartManager from "../../domain/managers/carts.js";
import RoleManager from "../../domain/managers/role.js";



export const list = async  (req, res, next) =>{
  try{
    const { limit, page } = req.query;
    const manager = new UserManager();

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
    const user = await manager.create(req.body);

    if (cartId) {
      const cart = await cartManager.getCartById(cartId);
      req.body.cart = cart.id
    }

    if (roleId) {
      const role = await roleManager.getOne(roleId); 
      req.body.role = role.id  
    }
    
  
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
      req.body.cart = cart.id
    }

    if (roleId) {
      const role = await roleManager.getOne(roleId); 
      req.body.role = role.id  
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