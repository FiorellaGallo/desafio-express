import UserMongooseDao from "../../data/dao/userMongooseDao.js";
import userCreateValidation from "../validations/user/userCreateValidation.js";
import idValidation from "../validations/shared/idValidation.js";
import userUpdateValidation from "../validations/user/userUpdateValidation.js";

class SessionManager{
    constructor(){
        this.userDao = new UserMongooseDao();
    }

    async paginate(criteria){
        return this.userDao.paginate(criteria)
    }

    async create(data){
        await userCreateValidation.parseAsync(data);
        const user = await this.userDao.create(data);
        return{...user, password: undefined};

    }

    async getOne(id){
        await idValidation.parseAsync({ id });
        return this.userDao.getOne(id);
    }

    async getOneByEmail(email){
        return this.userDao.getOneByEmail(email);
    }

    async updateOne(id, data){
        await userUpdateValidation.parseAsync({ ...data, id });
        return this.userDao.updateOne(id, data);
    }

    async deleteOne(id){
        await idValidation.parseAsync({ id });
        return this.userDao.deleteOne(id);
    }

}

export default SessionManager;