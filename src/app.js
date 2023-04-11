import  express  from 'express';
import productsRouter from './routes/products.routes.js';
import cartsRouter from './routes/carts.routes.js';
import handlebars from 'express-handlebars';
import __dirname from './dirname.js';
import viewsRouter from './routes/views.routes.js';
import { Server } from 'socket.io';
import ProductManager from "./model/product.js";
const productManager = new ProductManager();


const app = express();
const port = 8082;

app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars');
app.set('views', __dirname+'/views');

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use('/',viewsRouter);

app.use("/api/products",productsRouter);
app.use('/api/carts', cartsRouter);

const httpServer = app.listen(port,() =>console.log("Puerto escuchando en ",port));
const socketServer = new Server(httpServer);
socketServer.on('connection', socket =>
{
  console.log('Nuevo cliente conectado');

  socket.on('add', async(data) => {
    await productManager.loadData()
    await productManager.addProduct(data)
    socket.emit('newList',await productManager.getProducts())
  });

  socket.on('delete', async(data) => {
    await productManager.loadData()
    await productManager.deleteProduct(data)
    socket.emit('deleteProduct',await productManager.getProducts())
  });
})
