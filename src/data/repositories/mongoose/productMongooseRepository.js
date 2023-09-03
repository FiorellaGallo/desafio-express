import { productModel } from '../../model/product.model.js';
import Product from '../../../domain/entities/products.js';

class ProductMongooseRepository {

  async find(type, sortOrder, limit,stock) {
    const aggregate = [];

    if (sortOrder != null) {
      aggregate.push(
        { $sort: { price: sortOrder } }
      )
    };
    if (type != null) {
      aggregate.push(
        { $match: { category: type } }
      )
    };

    if (stock && stock > 0) {
      aggregate.push({
        $match: {stock: { $gte: stock}}
      })
    };
    aggregate.push({ $limit: limit });
  
    const filtered = await productModel.aggregate(aggregate);
    
    return filtered;
    
  };

  
  async create(product) {
   const document = await productModel.create(product);
   
    return new Product({
      id: document._id,
      title: document.title,
      description: document.description,
      price: document.price,
      thumbnail: document.thumbnail,
      code: document.code,
      stock: document.stock,
      category: document.category,
      owner: document.owner
    });
  };

  async getByCode(productCode){
    const product = await productModel.findOne({code:productCode});
   
    return product;
  }

  async getProductById(id){
    const document = await productModel.findOne({_id:id}).catch(()=>{return null});
    
    if (!document) return null;

    return new Product({
      id: document._id,
      title: document.title,
      description: document.description,
      price: document.price,
      thumbnail: document.thumbnail,
      code: document.code,
      stock: document.stock,
      category: document.category,
      owner: document.owner
    });
  };

  async updateProduct(id,data){
    const document = await productModel.findOneAndUpdate({ _id: id }, data, { new: true});

    if(!document) return null;

    return new Product({
      id: document._id,
      title: document.title,
      description: document.description,
      price: document.price,
      thumbnail: document.thumbnail,
      code: document.code,
      stock: document.stock,
      category: document.category,
      owner: document.owner
    });
  };

  async deleteProduct(id){
    const document = await productModel.deleteOne({_id:id});

    return new Product({
      id: document._id,
      title: document.title,
      description: document.description,
      price: document.price,
      thumbnail: document.thumbnail,
      code: document.code,
      stock: document.stock,
      category: document.category,
      owner: document.owner
    });
  };

};

export default ProductMongooseRepository;