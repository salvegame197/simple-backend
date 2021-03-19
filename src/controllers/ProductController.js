import Category from '../models/Category';
import Product from '../models/Product';

class ProductController {
  async index(req, res) {
    const products = await Product.find().populate('category');

    return res.json(products);
  }
  async store(req, res) {
    const { name, description, price, category } = req.body;

    const categortExist = await Category.findById(category);

    if (!categortExist) {
      return res.status(400).json({ error: 'Category does not found' });
    }

    const productExist = await Product.findOne({
      name,
      description,
      price,
      category,
    });

    if (productExist) {
      return res.status(400).json({ error: 'Product already exist' });
    }

    const product = await Product.create({
      name,
      description,
      price,
      category,
    });

    return res.json(product);
  }

  async update(req, res) {
    const { id } = req.params;
    const { name, description, price, category } = req.body;

    const productId = await Product.findById(id);

    if (!productId) {
      return res.status(400).json({ error: 'Product ID does not found' });
    }

    productId.name = name;
    productId.description = description;
    productId.price = price;
    productId.category = category;

    await productId.save();

    return res.json(productId);
  }

  async delete(req, res) {
    const { id } = req.params;
    const productId = await Product.findById(id);

    if (!productId) {
      return res.status(400).json({ error: 'Product ID does not found' });
    }
    await productId.remove();

    return res.status(204).send();
  }
}
export default new ProductController();
