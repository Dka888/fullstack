
import Product from "../models/product.js";

export const addProduct = async(req, res) => {
  try {
    const { name, category, price, rating, description, imgUrl } = req.body;
    const product = new Product({ name, category, price, rating, description, imgUrl });
    await product.save();
    res.status(201).json({ message: "Product added successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error while adding product" });
  }
}

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Error while fetching products" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Error while fetching product" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product updated successfully!", product });
  } catch (error) {
    res.status(500).json({ error: "Error while updating product" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error while deleting product" });
  }
};



export const addManyProducts = async (req, res) => {
  const products = req.body;

  try {
    const result = await Product.insertMany(products);
    res.status(201).json({ message: "Products are added", result });
  } catch (error) {
    res.status(500).json({ error: "Error" });
  }
};


