import EmailManager from "../../domain/managers/email.js";
import UserMananger from "../../domain/managers/user.js";
import { createHash } from "../../utils/index.js";


export const sendEmail = async  (req, res, next) =>
{
  try
  {
    console.log("Endpoit - mailer");
    const userMananger = new UserMananger();
    const manager = new EmailManager();
    const {email} = req.body;
    const searchEmail = await userMananger.getOneByEmail(email)
    if (!searchEmail) {
      return res.status(404).send("Email no exist")
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
  console.log("INFO RECIBIDA",email,password,confirmPassword);
  if(password != confirmPassword){
    return res.status(404).send("Different password")
  }
  const hashedPassword = await createHash(password)
  const searchEmail = await userMananger.getOneByEmail(email)
  console.log(searchEmail);
  const result = await userMananger.updateOne(searchEmail._id,{  password:hashedPassword})
  res.send (result)


}