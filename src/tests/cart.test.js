import chai from 'chai';
//import { faker } from '@faker-js/faker';
import supertest from 'supertest';
import initServer from './index.js';
//import path from "path";
import __dirname from "../dirname.js";
import { object } from 'zod';


const expect = chai.expect;
let jwt = '';



describe('Testing Auth Endpoints Success', ()=>{
    
    before(async function(){
        const {app,db} = await initServer();
        const application = app.callback();
        this.requester = supertest.agent(application);
        this.app = app;
        this.db = db;
        this.payload = {};
        const res = await this.requester.post('/api/sessions/login').send({ email:'pEPE@prueba.com',password:'12345678'});
        this.jwt = res.body.accessToken;
        this.currentCartId = '';
        const product = await this.requester.get('/api/products/?limit=1');
        this.currentCartProduct= product.body.payload[0]._id;
      
    });
    after(async function(){
        //await this.db.drop();
        await this.db.close();
        this.requester.app.close(()=>{
            req.prodLogger.info('Close conection');
        });

    });

    beforeEach(async function(){
        this.timeout(2000);
        await new Promise (resolve => setTimeout(resolve,500));
        
      
    });
     
    it ('Create a cart /api/carts/', async function(){

        const cart = ()=>{
            return{
                products: [{
                    _id: this.currentCartProduct,
                    quantity: 4
                }]
            }    
        };
       const payload = cart();
        
       return  this.requester
        .post('/api/carts/')
        .send(payload)
        .then(result =>{
            
            this.currentCartId = result.body.newCart._id
            this.currentCartProduct= result.body.newCart.products[0].product;
            expect(result.status).to.be.equals(202);
            expect(result.body).to.be.an('object');
            expect(result.body.newCart.products[0].product).to.be.equals(payload.products[0]._id);
           
        })
          
               
    })

    it ('Bring a card by id /api/carts/:id', async function () {

        const payload = this.currentCartId;

        return await this.requester
        .get('/api/carts/'+ payload)
        .then(result => {
            expect(result.body._id).to.be.equals(payload);
            expect(result).to.be.an('object');
        }) 
        
    })


    it ('Modify a cart /api/carts/:cid/product/:pid' , async function(){
        
        const payload = this.currentCartId;
        const product =this.currentCartProduct ;
        
        
        return this.requester
        .post(`/api/carts/${payload}/product/${product}`)
        .set('Authorization', `Bearer ${this.jwt}`)
        .send(payload)
        .then(result => {
            expect(result.status).to.be.equals(200);
            expect(result.body._id).to.be.equals(payload);
            expect(result.body.products[0].product).to.be.equal(product);
        }) 
        
    })

    it ('Modify all product of a cart /api/carts/:cid' , async function(){
        
        const payload = this.currentCartId;
        
        const cart = ()=>{
            return{
                products: [{
                    _id: this.currentCartProduct,
                    quantity: 10
                }]
            }    
        };

        return this.requester
        .put(`/api/carts/${payload}`)
        .send(cart())
        .then(result => {
            expect(result.status).to.be.equals(200);
            expect(result.body._id).to.be.equals(payload);
            
        }) 
        
    })

    it ('Modify the quantity of a product of a cart  /api/carts/:cid/product/:pid' , async function(){
        
        const payload = this.currentCartId;
        const product =this.currentCartProduct ;

        const cart = ()=>{
            return{
                
                quantity: 10
                
            }    
        };

        return this.requester
        .put(`/api/carts/${payload}/product/${product}`)
        .send(cart())
        .then(result => {
            expect(result.status).to.be.equals(200);
            expect(result.body._id).to.be.equals(payload);
            expect(result.body.products[0].product).to.be.equal(product);
            
        }) 
        
    })

    it ('Delete a product of a cart /api/carts/:cid/product/:pid' , async function(){
        
        const payload = this.currentCartId;
        const product =this.currentCartProduct ;
        

        return this.requester
        .delete(`/api/carts/${payload}/product/${product}`)
        .send()
        .then(result => {
            expect(result.status).to.be.equals(200);
            expect(result._data).to.be.equals(cart.product);
            
        }) 
        
    })

    it ('Delete all product of a cart /api/carts/:cid' , async function(){
        
        const payload = this.currentCartId;

      
        return this.requester
        .delete(`/api/carts/${payload}`)
        .send()
        .then(result => {
            
            expect(result.status).to.be.equals(200);
            expect(result._body._id).to.be.equals(payload);
            expect(result._body.products).to.be.an('array').that.is.empty;

            
        }) 
        
    })

    it ('Purchase ticket /api/carts/:cid/purchase' , async function(){
        
        const cartId = this.currentCartId;
        
        return this.requester
        .post(`/api/carts/${cartId}/purchase`)
        .set('Authorization', `Bearer ${this.jwt}`)
        .send()
        .then(result => {
            
            expect(result.status).to.be.equals(202);
           
            
        }) 
        
    })
    
})




