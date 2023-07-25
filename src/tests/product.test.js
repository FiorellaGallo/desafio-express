import chai from 'chai';
import { faker } from '@faker-js/faker';
import supertest from 'supertest';
import initServer from './index.js';
import path from "path";
import __dirname from "../dirname.js";


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
        const res = await this.requester.post('/api/sessions/login').send({ email:'probando11234@prueba.com',password:'12345678'});
        //console.log(res.body);
       this.jwt = res.body.accessToken;
       
       
    });
    after(async function(){
       //await this.db.drop();
        await this.db.close();
        this.requester.app.close(()=>{
            console.log('Close conection');
        });

    });

    beforeEach(async function(){
        this.timeout(2000);
       await new Promise (resolve => setTimeout(resolve,500));
        
      
    });
    
    it('Traer todo los productos /api/products/', function(){
        
        return this.requester
            .get('/api/products/')
            .then(result =>{
                const {statusCode} = result;
                expect(statusCode).to.be.equals(200);
                expect(result.body.status).to.be.equals('success');
                expect(result.body).to.have.property('payload');
                
                

            })
      
    }).timeout(5000)
    
    it ('Traer producto por id /api/products/:pid', function () {

     
        const payload ='6446eedc763b3a328b635a81'

        return this.requester
        .get('/api/products/'+ payload)
        //.send(payload._body)
        .then(result => {
            expect(result._body._id).to.be.equals(payload);
            expect(result).to.be.an('object');
        }) 
        
    }).timeout(5000)
    
    it ('Crear un producto /api/products/add', async function(){

        
        const product = ()=>{
            return{

            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            price:faker.airline.flightNumber({length:3}),
            code: faker.airline.flightNumber(),
            stock: faker.airline.flightNumber({length:3}),
            category: faker.commerce.product()
            };
        };
       const payload = product();

        return await this.requester
        .post('/api/products/add')
        .set('Authorization', `Bearer ${this.jwt}`)
        .field(payload)
        .attach("thumbnail","public/img/Iluminador_en_polvo_Loreal_Icoconic.jpg", {contentType: 'file'})
        
        .then(result =>{
            expect(result.statusCode).to.be.equals(200);
            expect(result).to.be.an('object');
            expect(result._body.title).to.be.equals(payload.title);
           
        })       
    }).timeout(5000)
    
    it ('Modificar un producto /api/products/update/:pid' ,function(){
        const payload ={
            id:'64b45439b87d1750cab6ac49',
            title:'prueba1'
        }
        
        return this.requester
        .put(`/api/products/update/${payload.id}`)
        .set('Authorization', `Bearer ${this.jwt}`)
        .send(payload)
        .then(result => {
          
           expect(result.body._id).to.be.equals(payload.id);
           expect(result.body.title).to.be.equal(payload.title);
        }) 
        
        

    })
    
    it ('Eliminar un producto /api/products//delete/:pid',function(){
        const payload ={
            id:'64b454e8e5157766945051ea',
            
        }
        
        return this.requester
        .delete(`/api/products/delete/${payload.id}`)
        .set('Authorization', `Bearer ${this.jwt}`)
        .then(result =>{
            console.log(result);
            expect(result.status).to.be.equals(200);
            expect(result.text).to.be.equals('Delete product');
           
        })

    })
})







