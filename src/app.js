import AppFactory from "./presentation/factories/appFactory.js";
import DbFactory from "./data/factories/dbFactory.js";
import config from "./config/index.js";

void (async() =>
{
  const db = DbFactory.create(process.env.DB);
  db.init(config.dbUri);

  const app = AppFactory.create();

  app.init();
  app.build();
  app.listen();
})();
















/*import  express  from 'express';
import productsRouter from './presentation/routes/products.routes.js';
import cartsRouter from './presentation/routes/carts.routes.js';
import handlebars from 'express-handlebars';
import __dirname from './dirname.js';
import viewsRouter from './presentation/routes/views.routes.js';
import { Server } from 'socket.io';
import ProductManager from "./domain/managers/product.js";
import mongoose from 'mongoose';
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import sessionRouter from "./presentation/routes/sessions.routes.js";
import userRouter from "./presentation/routes/users.routes.js";
import errorHandler from './presentation/middlewares/errorHandler.js';
import roleRouter from "./presentation/routes/role.routes.js";
import config from "./config/index.js";

const productManager = new ProductManager();

const app = express();
const httpServer = app.listen(config.port,() =>console.log("Escuchando..."));

app.use(cookieParser());
app.use(session({
  store:MongoStore.create({
    mongoUrl: config.dbUri,
    ttl:15,
  }),
  secret:'1234567',
  resave:false,
  saveUninitialized:false
}))

app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars');
app.set('views', __dirname+'/views');

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use('/',viewsRouter);

app.use('/api/sessions', sessionRouter);
app.use('/api/users', userRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use('/api/roles', roleRouter);


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
app.use(errorHandler);
mongoose.connect( config.dbUri).then(()=>console.log('se conecto a la db')).catch((error)=>console.log(error))

*/








