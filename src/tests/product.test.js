import chai from 'chai';
import { faker } from '@faker-js/faker';
import supertest from 'supertest';
import initServer from './index.js';
import path from "path";
import __dirname from "../dirname.js";


const expect = chai.expect;
//let jwt = '';



describe('Testing Auth Endpoints Success', ()=>{
    before(async function(){
        const {app,db} = await initServer();
        const application = app.callback();
        this.requester = supertest.agent(application);
        this.app = app;
        this.db = db;
        this.payload = {};
        const res = await this.requester.post('/api/sessions/login').send({ email:'probando11234@prueba.com',password:'12345678'});
        console.log(res.body);
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
      console.log(this.jwt);
        return this.requester
            .get('/api/products/')
            .then(result =>{
                const {statusCode} = result;
                //console.log(result);
                expect(statusCode).to.be.equals(200);
                

            })
      
    })

    it ('Traer producto por id /api/products/:pid', function () {

        const payload ='6446eedc763b3a328b635a81'
        return this.requester
        .get('/api/products/:pid')
        .send(payload)
        
        .then(result => {
            expect(result).to.be.an('object');
        }) 
        
    })
    
    it ('Crear un producto /api/products/add', function(){
       
        const payload={

            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            price:'100',
            code: faker.airline.flightNumber(),
            stock: faker.airline.flightNumber({length:3}),
            category: faker.commerce.product()
        }
       
        return this.requester
        .post('/api/products/add')
        .set('Authorization', `Bearer ${this.jwt}`)
        
        .field("title",payload.title)
        .field("description",payload.description)
        .field("price",payload.price)
        .field("code",payload.code)
        .field("stock",payload.stock)
        .field("category",payload.category)
        .attach("thumbnail","public/img/Iluminador_en_polvo_Loreal_Icoconic.jpg", {contentType: 'file'})
        
        .then(result =>{
            expect(result._body.title).to.be.equals(payload.title);
           
        })       
    })

    it ('Modificar un producto /api/products/update/:pid' ,function(){
        const payload ={
            id:'64b0a55cd718372c5e193717',
            title:'prueba1'
        }
        
        return this.requester
        .put(`/api/products/update/${payload.id}`)
        .set('Authorization', `Bearer ${this.jwt}`)
        .send(payload)
        .then(result => {
           console.log("id:::::::::::" ,result);
           expect(result._body._id).to.be.equals(payload.id);
           expect(result._body.title).to.be.equal(payload.title);
        }) 
        
        

    })

    it ('Eliminar un producto /api/products//delete/:pid',function(){
        const payload ={
            id:'64b0a57489d176cd2a77eacf',
            
        }
        
        return this.requester
        .delete(`/api/products/delete/${payload.id}`)
        .set('Authorization', `Bearer ${this.jwt}`)
        .then(result =>{
            console.log(result._body);
            expect(result._body._id).to.be.equals(1);
           
        })

    })
})







