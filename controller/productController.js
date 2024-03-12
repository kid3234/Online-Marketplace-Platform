const Product = require("../models/product");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getProductById = async (req, res) => {
  const pid = req.params.id;
  Product.findOne(pid, (err, product) => {
    if (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  });
};

exports.createProduct = async (req, res) => {
  try {
    const newProduct = Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error creating user: ", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateProduct = async (req, res) => {
  const pid = req.params.id;
  const updateData = req.body;
  try {
    const [updateCount, updatedProduct] = await Product.update(updateData, {
      where: { id: pid },
      returning: true,
    });

    if (updateCount == 0) {
      return res.status(404).json({ error: "Product not found!" });
    }
    res.json(updatedProduct);
  } catch (error) {
    console.error("Error Updating Product: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteProduct = async (req, res) => {
  const pid = req.params.id;

  try {
    const deleteCount = Product.destroy({
      where: { id: pid },
    });

    if (deleteCount === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({message:"Product deleted successfully"})
  } catch (error) {
    console.error("Error deleting product: ", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
