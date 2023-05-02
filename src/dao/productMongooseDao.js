import { productModel } from "../model/product.model.js";

class productMongooseDao {
  async find() {
    const productsDocument = await productModel.find();

    
    return productsDocument.map((document) => ({
      id: document._id,
      title: document.title,
      description: document.description,
      price: document.price,
      thumbnail: document.thumbnail,
      code: document.code,
      stock: document.stock,
      category: document.category
    }));
  }

  async create(product) {
   const document = await productModel.create(product);
    
    return {
      id: document._id,
      title: document.title,
      description: document.description,
      price: document.price,
      thumbnail: document.thumbnail,
      code: document.code,
      stock: document.stock,
      category: document.category
    };
  }

  async getByCode(productCode){
    const product = await productModel.findOne({code:productCode});
    return product;
  }

  async getProductById(id){
    const document = await productModel.findOne({_id:id}).catch(()=>{return null})
    
    if (!document) return null;

    return {
      id: document._id,
      title: document.title,
      description: document.description,
      price: document.price,
      thumbnail: document.thumbnail,
      code: document.code,
      stock: document.stock,
      category: document.category
    };
  }

  async updateProduct(id,data){
    const document = await productModel.findOneAndUpdate({ _id: id }, data, { new: true})

    if(!document) return null;

    return {
      id: document._id,
      title: document.title,
      description: document.description,
      price: document.price,
      thumbnail: document.thumbnail,
      code: document.code,
      stock: document.stock,
      category: document.category
    };
  }

  async deleteProduct(id){
    const document = await productModel.deleteOne({_id:id});
    return{
      id: document._id,
      title: document.title,
      description: document.description,
      price: document.price,
      thumbnail: document.thumbnail,
      code: document.code,
      stock: document.stock,
      category: document.category
    };
  }

}

export default productMongooseDao;