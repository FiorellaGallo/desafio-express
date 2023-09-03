import ProductManager from '../../domain/managers/product.js';

export const getAllProducts =('/',async (req, res) => {
  const productManager = new ProductManager();
  const limit = req.query.limit ? Number(req.query.limit) : 10;
  const type = req.query.type;
  const sortOrder = req.query.sortOrder ? Number(req.query.sortOrder) : null;
  const stock = req.query.stock ? Number(req.query.stock) : 0;

  const productsFilted = await productManager.getProducts(
    type,
    sortOrder,
    limit,
    stock
  );
    
  if (productsFilted.length === 0) {
    return res.status(400).send({ status: 'error' });
  } else {
    res.send({
      status: 'success',
      payload: productsFilted,
    });
  }
  });

export const getOneById =('/:pid',async (req, res) => {
  const productManager = new ProductManager();
  const id = String(req.params.pid);
  const productId = await productManager.getProductById(id);

  if (!productId) return res.status(404).send('Product no exist');
  res.send(productId);
});

export const uploaderProduct =('/add',async (req, res) => {
      //Los datos del producto fueron pasados por form-data.
  const { email } = req.user; // destructurin , obtengo el email del objeto req.user que proviene del middleware de auth
  const productManager = new ProductManager();
  try {
    if (!req.file) {
      return res
      .status(400)
      .send({ status: 'error', error: 'Could not save image' });
      }
    const data = req.body;
    if (!data) return res.status(404).send('No product');
    const img = `http://localhost:8084/${req.file.path.replace('public/','')}`;

    data.thumbnail = img;
    data.owner = email; // guardo en data ( en la propiedad owner) el email obtenido del objeto req.user
    const product = await productManager.addProduct(data);
    req.prodLogger.info(product);
    res.send(product);
    
  } catch (error) {
    res.status(404).send(error.message);
  }
});

export const updateOneProduct =('/update/:pid', async (req, res) => {
  const productManager = new ProductManager();
  const { email, isAdmin } = req.user; //además traemos el isAdmin para trabajar luego en el manager con las validaciones
  const id = String(req.params.pid);
  const data = req.body;
  data.owner = email; //volvemos atraer el email del objeto req.user. Email lo guardamos dentro de data

  const product = await productManager.updateProduct(id, data, isAdmin);
  if (!data) return res.status(404).send('No product');
  req.prodLogger.info(product);
  res.send(product);
});

export const deleteById =('/delete/:pid',async (req, res) => {
  const productManager = new ProductManager();
  const id = String(req.params.pid);
  const deleteElement = await productManager.deleteProduct(id);

  if (!deleteElement) return res.status(404).send('Product no exist');
  res.send('Delete product');
});
