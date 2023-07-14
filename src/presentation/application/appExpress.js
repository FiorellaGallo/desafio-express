import  express  from 'express';
import productsRouter from '../routes/products.routes.js';
import cartsRouter from '../routes/carts.routes.js';
import handlebars from 'express-handlebars';
import __dirname from '../../dirname.js';
import viewsRouter from '../routes/views.routes.js';
import { Server } from 'socket.io';
import ProductManager from "../../domain/managers/product.js";
import mongoose from 'mongoose';
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import sessionRouter from "../routes/sessions.routes.js";
import userRouter from "../routes/users.routes.js";
import errorHandler from '../../presentation/middlewares/errorHandler.js';
import roleRouter from "../routes/role.routes.js";
import config from "../../config/index.js";


class AppExpress{
    init(){
        this.app = express();
        this.app.use(cookieParser());
        this.app.use(session({
                store:MongoStore.create({
                mongoUrl: config.dbUri,
                ttl:15,
                }),
             secret:'1234567',
             resave:false,
             saveUninitialized:false
            }))

        this.app.engine('handlebars', handlebars.engine())
        this.app.set('view engine', 'handlebars');
        this.app.set('views', __dirname+'/views');

        this.app.use(express.json())
        this.app.use(express.urlencoded({extended:true}))
        this.app.use(express.static('public'))

    }
    build(){
        this.app.use('/',viewsRouter);
        this.app.use('/api/sessions', sessionRouter);
        this.app.use('/api/users', userRouter);
        this.app.use("/api/products", productsRouter);
        this.app.use("/api/carts", cartsRouter);
        this.app.use('/api/roles', roleRouter);
        this.app.use(errorHandler);

    }
    callback(){
       return this.app; 

    }
    close(){
        this.server.close();
    }

    listen(){
        const httpServer = this.app.listen(config.port,()=>{
            console.log("Server listening...");
        })
        const productManager = new ProductManager();
        const socketServer = new Server(httpServer);
        socketServer.on('connection', socket =>
        {
            console.log('Nuevo cliente conectado');

            socket.on('add', async(data) => {
                //await productManager.loadData()
                await productManager.addProduct(data)
                socket.emit('newList',await productManager.getProducts())
            });

            socket.on('delete', async(data) => {
                //await productManager.loadData()
                await productManager.deleteProduct(data)
                console.log(data);
                socket.emit('deleteProduct',await productManager.getProducts(null,null,10))
            });
        })

        return httpServer;

    }
}

export default AppExpress;
















//mongoose.connect( config.dbUri).then(()=>console.log('se conecto a la db')).catch((error)=>console.log(error))





