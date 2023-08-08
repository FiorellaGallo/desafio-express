import SessionManager from "../../domain/managers/user.js";
import { createHash, generateToken, isValidPassword } from "../../utils/index.js";

export const login = async  (req, res) =>{
   
    const { email, password } = req.body;

    if (!email && !password) throw new Error('Email and Password invalid format.');
   
    const manager = new SessionManager();
    const user = await manager.getOneByEmail(email);
    const isHashedPassword = await isValidPassword(password, user.password);
    const rol = email === 'adminCoder@coder.com' ? "Admin":"Usuario";

    if (!isHashedPassword) return res.status(401).send({ message: 'Login failed, invalid password.'})
    
    const accessToken = await generateToken(user);
    
    res.send({ accessToken, message: 'Login success!',...user,password:undefined,rol});
};

export const logout = async (req, res) =>{
  
    req.session.destroy( err => {
      
        if(!err) return res.send({ message: 'Logout ok!' });
      
      res.send({ message: 'Logout error!', body: err })
  });
};

export const current = async  (req, res) =>
{
  res.status(200).send({ status: 'Success', payload: req.user });
};

export const signup = async (req, res, next) =>
{try{ 
    const manager = new SessionManager();

    const payload = {
      ...req.body,
      password: await createHash(req.body.password, 10)
    }
    console.log(payload);
    const user = await manager.create(payload);

    res.status(201).send({ status: 'success', user, message: 'User created.' });
  }
  catch(e){
    next(e)
  }

}