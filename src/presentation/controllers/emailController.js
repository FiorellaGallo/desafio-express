import EmailManager from '../../domain/managers/email.js';
import UserMananger from '../../domain/managers/user.js';
import { createHash } from '../../utils/index.js';


export const sendEmail = async  (req, res, next) =>
{
  try
  {
    const userMananger = new UserMananger();
    const manager = new EmailManager();
    const {email} = req.body;
    const searchEmail = await userMananger.getOneByEmail(email)
    if (!searchEmail) {
      return res.status(404).send('Email no exist')
    }

    await manager.send('forgotPassword.hbs', email);

    res.send({ status: 'success' });
  }
  catch (e)
  {
		next(e);
	}
};

export const changeUserPassword = async (req, res, next)=>{
  
  const userMananger = new UserMananger();
  const{password,confirmPassword}=req.body;
  const email = req.user.email;
  try
  {
    if(password != confirmPassword){
      return res.status(404).send('Different password');
    };
    const hashedPassword = await createHash(password);
    const searchEmail = await userMananger.getOneByEmail(email);
  
    const result = await userMananger.updateOne(searchEmail._id,{  password:hashedPassword})
    res.send (result);
  }
  catch (e)
  {
		next(e);
	}
};