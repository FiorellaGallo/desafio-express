import config from '../config/index.js';
import DbFactory from '../data/factories/dbFactory.js';
import chai from 'chai';



const db = DbFactory.create(config.dbType);

const expect = chai.expect;

import CartMongooseRepository from '../data/repositories/mongoose/cartMongooseRepository.js';
import ProductMongooseRepository from '../data/repositories/mongoose/productMongooseRepository.js';



describe('Testing Cart Mongoose Repository', () => {
    before(function () {
        db.init(config.dbUri);
        this.cartRepository = new CartMongooseRepository();
        this.productRepository = new ProductMongooseRepository();
        this.currentCartId = "";
        this.currentProductId = null;
        this.currentProductQuantity = 5;
    });
    after(function () {
        db.drop();
        db.close();
    });

    beforeEach(function () {
        this.timeout(5000);
    });

    it('El respositorio debe ser una instacia de cartMongooseRepository', function () {
        expect(this.cartRepository instanceof CartMongooseRepository).to.be.ok;
    })
    it('The repository should create a cart ', async function () {

        const productsFromDB = await this.productRepository.find(null, null, 1, null)

        this.currentProductId = String(productsFromDB[0]._id);
        
        
        const cart =
            [{
                _id: this.currentProductId,
                quantity: this.currentProductQuantity 
            }]


        return this.cartRepository
            .createCart(cart)
            .then(result => {
                
                this.currentCartId = String(result._id);
                expect(Array.isArray(result.products)).to.be.equals(true);
                expect(String(result.products[0].product)).to.be.equals(this.currentProductId);
            })
    });

    //PARA QUE FUNCIONE SE DEBE COMENTAR PRODUCT DEL SCHEMA YA QUE UTILIZA UNA POPULACIÓN
    /*it('The repository should return a cart by id',function(){
    
        const cart ={
            id : '64f6237a0dc7f125f9131f1c',
            products: [{
                product: {},
                quantity: 4
            }]
        };
        
        return this.cartRepository
        .findCartById(cart.id)
        .then(result => {
            expect(result._id.toString()).to.eql(cart.id);
            
        })
    })*/
    it('The repository should return a modified cart', async function () {
        const idCart = '64f6237a0dc7f125f9131f1c'
        const product = '6446eedc763b3a328b635a81'
        const cart = {
            _id: '64f6237a0dc7f125f9131f1c',
            products: [{
                product: '6446eedc763b3a328b635a81',
                quantity: 0
            }]

        };

        const updateData = {
            productId: cart.products[0].product,
            quantity: cart.products[0].quantity + 1,
        };

        return this.cartRepository
            .updateCart(idCart, product)
            .then(result => {
                expect(result._id.toString()).to.be.equals(idCart);

                expect(result.products[0].quantity).to.be.gt(0);// consulta que sea mayor a cero

            });
    })

    it('The repository should delete a product', function () {
        const idCart = this.currentCartId;
        const idProduct = this.currentProductId;


        return this.cartRepository
            .deleteProduct(idCart, idProduct)
            .then(result => {
                expect(result.products.length).to.be.equals(0);

            })
    })

    it('The repository should delete all product', function () {
        const idCart = '64f66aee2520252e66e5f62e'

        return this.cartRepository
            .deleteAllProducts(idCart)
            .then(result => {
                expect(result.products).to.deep.equal([]);

            })
    });

    /*   it('The repository should return a modified product of de cart',function(){
           const idCart ='64f6237a0dc7f125f9131f1c'
           
           const cart ={
               products: [{
                   product: '6446eedc763b3a328b635a81',
                   quantity: 5
               }]
   
           };
   
           return this.cartRepository
           .changeProducts(idCart,cart)
           .then(result =>{
               expect(result._id.toString()).to.be.equals(idCart);
               expect(result.products[0]).to.equal(cart.products )
               
           })
       })*/





})
