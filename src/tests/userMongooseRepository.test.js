import config from '../config/index.js';
import DbFactory from '../data/factories/dbFactory.js';
import chai from 'chai';
import { faker } from '@faker-js/faker';



const db = DbFactory.create(config.dbType);

const expect = chai.expect;

import UserMongooseRepository from '../data/repositories/mongoose/userMongooseRepository.js';


describe('Testing User Mongoose Repository', ()=>{
    before(function(){
        db.init(config.dbUri);
        this.userRepository = new UserMongooseRepository();
    });
    after(function(){
        db.drop();
        db.close();
    });

    beforeEach(function(){
        this.timeout(5000);
    });
    
    it('El respositorio debe ser una instacia de userMongooseRepository', function(){
        expect(this.userRepository instanceof UserMongooseRepository).to.be.ok;

    })
    it('El repositorio debe devolver un arreglo', function () {
        return this.userRepository
            .paginate({ limit: 5, page: 1 })
            .then(result =>
            {
                expect(Array.isArray(result.users)).to.be.equals(true);
                expect(result.pagination.limit).to.be.equals(5);
            }
        );
    });
    it('El repositorio debe poder crear un user', function () {
        const user = {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            age: 18,
            isAdmin: false,
            role:'64a46f98c77b8ef6551cd1a4',
            password: 12345678
        };

        return this.userRepository
            .create(user)
            .then(result =>
            {
                expect(result.firstName).to.be.equals(user.firstName);
                expect(result.email).to.be.equals(user.email);
            }
        );
    });
    it ('El repositorio debe devolver un usuario modificado',function(){
        
        const user ={
            id :'64a4767b6f8195131776fb0a',
            firstName: faker.person.firstName()
            

        };
        return this.userRepository
        .updateOne(user.id,{firstName:user.firstName})
        .then(result =>{
            expect(result._id.toString()).to.be.equals(user.id);
            expect(result.firstName).to.be.equal(user.firstName);
            
        })
        
    })
    //PARA QUE FUNCIONE SE DEBE COMENTAR DEL SCHEMA EL ROLE.
    /*it('El repositorio debe devolver usuario por id',function(){
    
        const user ={
            id:'64a4767b6f8195131776fb0a'
           
        }
        return this.userRepository
        .getOne(user.id)
        .then(result => {
            expect(result._id.toString()).to.be.equals(user.id);
          
        })
    })*/
    it ('El repositorio debe eliminar un usuario',function(){
        
        const userId = '64a47680a72dccf7193e6662';
        
        return this.userRepository
        .deleteOne(userId)
        .then(result =>{
            expect(result.deletedCount).to.be.equals(1);
           
        })
        
    })

})