import CartManager from '../../domain/managers/carts.js';
import ProductManager from '../../domain/managers/product.js';
import TicketManager from '../../domain/managers/ticket.js';

export const createCart=("/", async (req, res) => {
    const cartManager = new CartManager();
    const productManager = new ProductManager();

  const { products } = req.body;
console.log(products);
  //await cartManager.loadData();
  //await productManager.loadData();

    if (!products) {
      await cartManager.addCart([])
      return  res.status(202).send('Create cart');};
    

    const existProducts = [];
    // Verificar si son productos válidos
    for (const product of products) {
        const existProduct = await productManager.getProductById(String(product._id));
       console.log(existProduct);
        if (existProduct) existProducts.push(product)
      else return res.status(404).send(`Product no exist id: ${product._id}`)
    }
    
    // Genera un carrito con los productos recibidos
    const newCart = await cartManager.addCart(existProducts);
    console.log('aca',existProducts);

    res.status(202).send(newCart);
//,"Cart created successfully"

});
    

export const findCartById = ("/:cid", async (req, res) => {
    const cartManager = new CartManager();
    
  const id = String(req.params.cid);
  const cartId = await cartManager.getCartById(id);
  if (!cartId) return res.status(404).send("Cart no exist");
  res.send(cartId);
});


export const updateCart = ("/:cid/product/:pid", async (req, res) => {
    const cartManager = new CartManager();
    const productManager = new ProductManager();

  const cid = String(req.params.cid);
  const pid = String(req.params.pid);

  const cartId = await cartManager.getCartById(cid);
  if (!cartId) return res.status(404).send("Cart no exist");

  const productCart = cartId.products.find((product) => product?.id === pid);

  if (!productCart) {
    const validateProduct = await productManager.getProductById(pid);
    if (!validateProduct) return res.status(404).send("Product no exist");
    cartId.products.push({ id: pid, quantity: 1 });
  } 

  const updatedCart = await cartManager.updateCart(cid,pid);
  res.send(updatedCart);
});

export const deleteProduct =
  ("/:cid/product/:pid",
  async (req, res) => {
    const cartManager = new CartManager();

    const cid = String(req.params.cid);
    const pid = String(req.params.pid);

    const cart = await cartManager.getCartById(cid);
    console.log(cart.products);

    const productCart = cart.products.find((product) => product?.product._id.toString() === pid);
    if (!productCart) return res.status(404).send("Product no exist");

    await cartManager.deleteOneProduct(cid,pid);
    res.send(productCart);
  });

export const deleteAllProducts =
  ("/:cid",
  async (req, res) => {
    const cartManager = new CartManager();

    const cid = String(req.params.cid);

    const cart = await cartManager.getCartById(cid);
    
    if (!cart) return res.status(404).send("Cart no exist");

    await cartManager.deleteProducts(cid);
    res.send(cart);
  });

  export const updateAllProducts = ("/:cid",
  async (req, res) => {
    const cartManager = new CartManager();

    const cid = String(req.params.cid);
    const {products} = req.body
    console.log(products);
    const cart = await cartManager.getCartById(cid)
    if (!cart) return res.status(404).send("Cart no exist")

    const newCart = await cartManager.changeAllProducts(cid,products);

    res.send(newCart);
  })

export const updateQuantity = ("/:cid/products/:pid",
    async (req, res) => {
    const cartManager = new CartManager();
   
    const {quantity} = req.body
    const cid = String(req.params.cid);
    const pid = String(req.params.pid);

    const cart = await cartManager.getCartById(cid)
   
    if (!cart) return res.status(404).send("Cart no exist")
    const productCart = cart.products.find((product) => product?.product._id.toString() === pid)
    if (!productCart) return res.status(404).send("Product no exist in the cart")
    
    const newQuantity = await cartManager.changeQuantity(cid,pid,quantity)

    res.send(newQuantity);

  });

export const purchase = ("/:cid/purchase", async (req,res) => {
  const cartManager = new CartManager();
  const ticketManager = new TicketManager();
  const productManager = new ProductManager();
  const cid = (req.params.cid);

 // const ticket = await ticketManager.create(data);
  const cart = await cartManager.getCartById(cid);
  let amount = 0;
  const {email} = req.user;
  let unprocessedProduct = [];



  for (const cartProduct of cart.products){
    console.log(cartProduct);
    const product = await productManager.getProductById(cartProduct.product._id.toString());
   
    if (product.stock >= cartProduct.quantity){
      const newStock = product.stock - cartProduct.quantity;
      //product.stock = newStock;
      await productManager.updateProduct(product._id, {stock : newStock})
      amount += product.price * cartProduct.quantity;
      await cartManager.deleteOneProduct(cid,cartProduct.product._id.toString())
     
    } 
    else{unprocessedProduct.push(product._id);} 
  }

  const ticket = await ticketManager.create({amount:amount, purchaser:email});
  
  res.status(202).send({message:"Successful ticket",ticket:ticket,productNotAdded:unprocessedProduct});
 

  



});
