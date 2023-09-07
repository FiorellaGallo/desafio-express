import chai from 'chai';
import { faker } from '@faker-js/faker';
import supertest from 'supertest';
import initServer from './index.js';



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
    
    it('Creación de cuenta/api/sessions/signup', function(){
       
       this.payload = {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        age: 20,
        password:"1234567",
       // cartId:"649c76f4a64086a07d26a117",
        //roleId:"647fc202e1e0b1b4e346bc8b",
        isAdmin: false
    

       }
        return this.requester
            .post('/api/sessions/signup')
            .send(this.payload)
            .then(result =>{
                const {_body,status} = result;
                expect(status).to.be.equals(201);
                expect(_body.user.email).to.be.equals(this.payload.email);
                expect(_body.message).to.be.equals("User created.");

            })
      
    })

    it('Login de cuenta /api/sessions/login', function ()
    {
        const payload = {
            email: this.payload.email,
            password: this.payload.password
        };
        
        return this.requester
            .post('/api/sessions/login')
            .send(payload)
            .then(result =>
            {
                const { _body, status } = result;

                expect(status).to.be.equals(200);
                expect(_body.message).to.be.equals("Login success!");

                jwt = _body.accessToken;
                
            }
        );
    });

    it('Current /api/sessions/current', function ()
    {
        return this.requester
            .get('/api/sessions/current')
            .set('Authorization', `Bearer ${jwt}`)
            .then(result =>
            {
                const { _body, status } = result;
                expect(status).to.be.equals(200);
                expect(_body.payload.email).to.be.equals(this.payload.email);
            }
        );
    });
})





















    

