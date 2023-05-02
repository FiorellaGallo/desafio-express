import CartManager from '../managers/carts.js';
import ProductManager from '../managers/product.js';

export const createCart=("/", async (req, res) => {
    const cartManager = new CartManager();
    const productManager = new ProductManager();

  const { products } = req.body;
console.log(products);
  //await cartManager.loadData();
  //await productManager.loadData();

    if (!products) await cartManager.addCart([]);
    // Verificar si son productos válidos
    for (const product of products) {
        const existProduct = await productManager.getProductById(String(product.id));
       if (!existProduct) return res.status(404).send(`Product no exist id: ${product.id}`)
    }
    
    // Genera un carrito con los productos recibidos
    const newCart = await cartManager.addCart(products);

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
  } else {
    const newProductCart = cartId.products.map((item) => {
      if (item.id === pid) {
        item.quantity++;
      }
      return item;
    });

    cartId.products = newProductCart;
  }

  await cartManager.updateCart(cid,cartId);
  res.send(cartId);
});