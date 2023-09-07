import chai from 'chai';
import { faker } from '@faker-js/faker';
import supertest from 'supertest';
import initServer from './index.js';
//import path from "path";
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
        const res = await this.requester.post('/api/sessions/login').send({ email:'Jasen56@yahoo.com',password:'12345'});
        this.jwt = res.body.accessToken;
        this.currentUserId ='';
      
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
     
    it ('Create a user /api/users', async function(){

        const user = ()=>{
            return{
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName() ,
                email: faker.internet.email(),
                age: 20,
                password:"12345",
                cartId:"",
                roleId:"647f76511497d8704776ecd2",
                isAdmin: false,
                documents:[],
                lastConnection:"2023-08-02T16:59:34.643Z"
 
            }    
        };
       const dataUser = user();
        
       return  this.requester
        .post('/api/users/')
        .set('Authorization', `Bearer ${this.jwt}`)
        .send(dataUser)
        .then(result =>{
            this.currentUserId = result._body.user._id
            expect(result.status).to.be.equals(200);
            expect(result._body.user).to.be.an('object');
            expect(result._body.user.email).to.be.equals(dataUser.email);
           
        })
          
               
    })

    it ('Bring all user /api/users/all', async function () {

        return await this.requester
        .get('/api/users/all')
        .then(result => {
            expect(result.statusCode).to.be.equals(200);
            expect(result._body.status).to.be.equals('success');
            expect(result._body).to.have.property('allUser');
        }) 
        
    })

    it ('Bring a user by id /api/users/:id', async function () {

        const idUser = this.currentUserId;

        return await this.requester
        .get(`/api/users/${idUser}`)
        .then(result => {
            expect(result.statusCode).to.be.equals(200);
            expect(result._body.user._id).to.be.equals(idUser);
            expect(result._body.user).to.be.an('object');
        }) 
        
    })

    it ('Modify a user by id  /api/users/:id' , async function(){
        
        const idUser = this.currentUserId;
        const user = ()=>{
            return{
                firstName: faker.person.firstName(),
                
            }    
        }
        return this.requester
        .put(`/api/users/${idUser}`)
        .send(user())
        .then(result => {
            expect(result.statusCode).to.be.equals(200);
            expect(result._body.status).to.be.equals('success');
            expect(result._body.message._id).to.be.equals(idUser);
        }) 
        
    })

    it ('Create documents /api/users/:id/documents', async function(){
        
        const idUser = this.currentUserId;
        
       return  this.requester
        .post(`/api/users/${idUser}/documents`)
        //.field(payload)
        .attach('products','public/img/Iluminador_en_polvo_Loreal_Icoconic.jpg')
        .then(result =>{
            expect(result.status).to.be.equals(200);
            expect(result._body.message._id).to.be.equals(idUser);
            expect(result.body.message.documents).to.not.be.empty;
   
        })          
    })
    
    it ('Modify a role premium  /api/users/premium/:id' , async function(){
        
        const idUser = this.currentUserId;
        const user = ()=>{
            return{
                premium: true   
            }    
        }
        return this.requester
        .post(`/api/users/premium/${idUser}`)
        .send(user())
        .then(result => {
            
            expect(result.statusCode).to.be.equals(200);
            expect(result._body.status).to.be.equals('success');
            expect(result._body.message._id).to.be.equals(idUser);
        }) 
        
    })

    it ('Delete a user /api/users/delete/connection' , async function(){
        
        return this.requester
        .delete(`/api/users/delete/connection`)
        .then(result => {
            
            expect(result.statusCode).to.be.equals(200);
            expect(result._body.status).to.be.equals('success');
            
        }) 
        
    })

    it ('Delete a user /api/users/:id' , async function(){
        
        const idUser = this.currentUserId;
       
        return this.requester
        .delete(`/api/users/${idUser}`)
        .then(result => {
            expect(result.statusCode).to.be.equals(200);
            expect(result._body.status).to.be.equals('success');
            expect(result._body.message).to.be.equals('User deleted.');
            
        }) 
        
    })



    
















  
})


