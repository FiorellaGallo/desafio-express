import  express  from 'express';
import productsRouter from './routes/products.routes.js';
import cartsRouter from './routes/carts.routes.js';
import handlebars from 'express-handlebars';
import __dirname from './dirname.js';
import viewsRouter from './routes/views.routes.js';
import { Server } from 'socket.io';
import ProductManager from "./managers/product.js";
import mongoose from 'mongoose';

const productManager = new ProductManager();

const app = express();
const httpServer = app.listen(8084,() =>console.log("Escuchando..."));


app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars');
app.set('views', __dirname+'/views');

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use('/',viewsRouter);

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);


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

mongoose.connect( "Aca va el string de conexión").then(()=>console.log('se conecto a la db')).catch((error)=>console.log(error))










