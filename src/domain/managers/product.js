
import container from "../../container.js";

class ProductManager {
  
  constructor() {
    
    this.productRepository = container.resolve('ProductRepository');
  }


  async getProducts(type,sortOrder,limit, stock) {
    const products = await this.productRepository.find(type,sortOrder,limit,stock)
    return  products;
  }

  async addProduct(newProduct) {
   
    const codeExist = await this.productRepository.getByCode(newProduct.code);

    if (codeExist) throw Error("This code exist");


    if (!newProduct.title || newProduct.title.trim().length === 0)
      throw Error("Empty title field");

    if (!newProduct.description || newProduct.description.trim().length === 0)
      throw Error("Empty description field");

    if (!newProduct.price) throw Error("Empty price field");

    if (!newProduct.thumbnail || newProduct.thumbnail.trim().length === 0)
      throw Error("Empty thumbnail field");

    if (!newProduct.code || newProduct.code.trim().length === 0)
      throw Error("Empty code field");

    if (!newProduct.stock) throw Error("Empty stock field");

    if (!newProduct.category || newProduct.category.trim().length === 0)
      throw Error("Empty category field");

    return await this.productRepository.create({
      ...newProduct,
      status: true,
    });
  }

  async getProductById(idProduct) {
   
    return this.productRepository.getProductById(idProduct)
  }
//se modificaron ambos enpoints 
  async updateProduct(id, productChange, isAdmin) {
    const product = await this.productRepository.getProductById(id)
    const emailOwner = productChange.owner;
    if (emailOwner == product.owner || isAdmin == true) {
      return await this.productRepository.updateProduct(id,productChange)  
    }
    return new Error ("You do not have permissions to modify the product")
    
   
  }

  async deleteProduct(id, owner, isAdmin) {
    const product = await this.productRepository.getProductById(id)
    const emailOwner = owner;
    if (emailOwner == product.owner || isAdmin == true) {
      return await this.productRepository.deleteProduct(id); 
    }
    return new Error ("You do not have permissions to delete the product")
   
  }
}

export default ProductManager;
