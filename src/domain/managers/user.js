
import userCreateValidation from "../validations/user/userCreateValidation.js";
import idValidation from "../validations/shared/idValidation.js";
import userUpdateValidation from "../validations/user/userUpdateValidation.js";
import container from "../../container.js";

class SessionManager{
    constructor(){
        this.userRepository = container.resolve('UserRepository');
    }

    async paginate(criteria){
        return this.userRepository.paginate(criteria)
    }

    async create(data){
        await userCreateValidation.parseAsync(data);
        const user = await this.userRepository.create(data);
        return{...user, password: undefined};

    }

    async getOne(id){
        await idValidation.parseAsync({ id });
        return this.userRepository.getOne(id);
    }

    async getOneByEmail(email){
        return this.userRepository.getOneByEmail(email);
    }

    async updateOne(id, data){
        await userUpdateValidation.parseAsync({ ...data, id });
        return this.userRepository.updateOne(id, data);
    }

    async deleteOne(id){
        await idValidation.parseAsync({ id });
        return this.userRepository.deleteOne(id);
    }

}

export default SessionManager;