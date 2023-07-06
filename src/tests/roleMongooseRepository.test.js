import config from '../config/index.js';
import DbFactory from '../data/factories/dbFactory.js';
import chai from 'chai';



const db = DbFactory.create(config.dbType);

const expect = chai.expect;

import RoleMongooseRepository from '../data/repositories/mongoose/roleMongooseRepository.js';


describe('Testing Role Mongoose Repository', ()=>{
    before(function(){
        db.init(config.dbUri);
        this.roleRepository = new RoleMongooseRepository();
    });
    after(function(){
        db.drop();
        db.close();
    });

    beforeEach(function(){
        this.timeout(5000);
    });
    
    it('El respositorio debe ser una instacia de roleMongooseRepository', function(){
        expect(this.roleRepository instanceof RoleMongooseRepository).to.be.ok;
    })
    it('El respositorio debe devolver un arreglo',function(){
        return this.roleRepository.paginate({limit:5,page:1}).then(result=> {expect(Array.isArray(result.roles)).to.be.equals(true);})
        
    })
    it('El repositorio debe  crear un rol',function(){
        
        const role ={
            name: "admin",
            permissions: []

        };
        return this.roleRepository
        .create(role)
        .then(result =>{
            expect(result.name).to.be.equals(role.name);
            expect(Array.isArray(result.permissions)).to.be.equals(true);
           
        })
    })
    it('El repositorio debe devolver rol por id',function(){
    
        const role ={
            id : '647f76511497d8704776ecd2',
            name: "admin",
            permissions: []

        };
        
        return this.roleRepository
        .getOne(role.id)
        .then(result => {
            expect(result._id.toString()).to.be.equals(role.id);
            
        })
    })
    it ('El repositorio debe devolver un rol modificado',function(){
        
        const role ={
            id : '64a46700090f0c0c434847d4',
            name: "usuario",
            permissions: []

        };
        return this.roleRepository
        .updateOne({_id:role.id},{name:role.name})
        .then(result =>{
            expect(result._id.toString()).to.be.equals(role.id);
            expect(result.name).to.be.equal(role.name);
            expect(result.permissions).to.deep.equal(role.permissions);
        })
        
    })
    it ('El repositorio debe eliminar un rol',function(){
        
        const roleId = '64a46eea100af682abbf6e82';
        
        return this.roleRepository
        .deleteOne(roleId)
        .then(result =>{
            expect(result.deletedCount).to.be.equals(1);
           
        })
        
    })




})