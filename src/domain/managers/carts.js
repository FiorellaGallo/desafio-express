//import fs from "fs/promises";

import container from "../../container.js";


class CartManager {
  //carts = [];
  //static id = 1;

  constructor() {
    //this.path = "./data/carts.json";
    this.cartRepository = container.resolve('CartRepository');
  }

  //async loadData() {
  //  this.carts = await this.getCarts();
  //  CartManager.id = this.carts.length;
  //}

  //async getCarts() {

    /*
    try {
      const carts = await fs.readFile(this.path, "utf-8");
      if (carts) return JSON.parse(carts);
    } catch (error) {
      console.log(`El archivo ${this.path} no existe, creando...`);
      await fs.writeFile(this.path, "[]");
      return [];
    }
    */

  //}

  async addCart(cart) {

    return await this.cartRepository.createCart(cart);

    /*
    const cart = {
      id: CartManager.id++,
      products: products,
    };
    
    this.carts.push(cart);
    await fs.writeFile(this.path, JSON.stringify(this.carts));
    */

  }

  async getCartById(idCart) {
    /*
    try {
      const cart = await fs.readFile(this.path, "utf-8");
      const cartParsed = JSON.parse(cart);
      const cartExist = cartParsed.find((cart) => cart?.id === idCart);
      console.log(cartExist);
      return cartExist;
    } catch (error) {
      console.log(error);
      throw new Error("This cart no exist");
    }
    */
    return await this.cartRepository.findCartById(idCart);
  }

  async updateCart(idCart, idProduct) {
    /*
    this.carts[cart.id] = cart;
    await fs.writeFile(this.path, JSON.stringify(this.carts));
    */
   return await this.cartRepository.updateCart(idCart, idProduct); 
  }

  async deleteOneProduct(cid,pid) {
    return await this.cartRepository.deleteProduct(cid,pid);
  }

  async deleteProducts(cid) {
     return await this.cartRepository.deleteAllProducts(cid)
    
  }

  async changeAllProducts (cid, data) {
    return await this.cartRepository.changeProducts(cid, data)
  }

  async changeQuantity(cid, pid,quantity ){
    return await this.cartRepository.newQuantity(cid, pid, quantity)
  }
}


export default CartManager;
