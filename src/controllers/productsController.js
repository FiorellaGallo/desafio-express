import ProductManager from "../managers/product.js";



export const getAllProducts = ("/", async (req, res) => {
  
    const productManager = new ProductManager();

    const productos = await productManager.getProducts();
    const limit = req.query.limit;
    if (limit && limit > 0) {
      return res.send(productos.slice(0, limit));
    }
    res.send(productos);
  
});

export const getOneById = ("/:pid", async (req, res) => {

    const productManager = new ProductManager();

    const id = String(req.params.pid);
    const productId = await productManager.getProductById(id);
    if (!productId) return res.status(404).send("Product no exist");
    res.send(productId);
});

export const uploaderProduct = ("/add", async (req, res) => {
  //Los datos del producto fueron pasados por form-data.

    const productManager = new ProductManager();
    try {
      if (!req.file) {
        return res
          .status(400)
          .send({ status: "error", error: "Could not save image" });
      }
      const data = req.body;
      if (!data) return res.status(404).send("No product");
      const img = `http://localhost:8084/${req.file.path.replace("public/", "")}`;
      //await productManager.loadData();
      data.thumbnail = img;
      const product = await productManager.addProduct(data);
      res.send(product);
    } catch (error) {
      res.status(404).send(error.message);
    }
});

export const updateOneProduct = ("/update/:pid", async (req, res) => {

    const productManager = new ProductManager();

    const id = String(req.params.pid);
    const data = req.body;
    //await productManager.loadData();
    const product = await productManager.updateProduct(id,data);
    if (!data) return res.status(404).send("No product");
    res.send(product);
});


export const deleteById =("/delete/:pid", async(req,res) =>{

    const productManager = new ProductManager();

    const id= String(req.params.pid)
    //await productManager.loadData()
    const deleteElement = await productManager.deleteProduct(id)
    if(!deleteElement) return res.status(404).send("Product no exist")
    res.send("Delete product")
})
  
  
