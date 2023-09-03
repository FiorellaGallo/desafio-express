
import container from "../../container.js";

class CartManager {
  
  constructor() {
    
    this.cartRepository = container.resolve('CartRepository');
  };

  async addCart(cart) {

    return await this.cartRepository.createCart(cart);
  };

  async getCartById(idCart) {
    
    return await this.cartRepository.findCartById(idCart);
  };

  async updateCart(idCart, idProduct) {
    
   return await this.cartRepository.updateCart(idCart, idProduct); 
  };

  async deleteOneProduct(cid,pid) {

    return await this.cartRepository.deleteProduct(cid,pid);
  };

  async deleteProducts(cid) {

    return await this.cartRepository.deleteAllProducts(cid)
    
  };

  async changeAllProducts (cid, data) {

    return await this.cartRepository.changeProducts(cid, data)
  };

  async changeQuantity(cid, pid,quantity ){

    return await this.cartRepository.newQuantity(cid, pid, quantity)
  };
}

export default CartManager;
