import Category from '../models/Category';

class CategoryController {
  async index(req, res) {
    const categories = await Category.find();

    return res.json(categories);
  }

  async store(req, res) {
    const { name } = req.body;

    const categoryExists = await Category.findOne({ name });

    if (categoryExists) {
      return res.status(404).json({ error: 'Category NAME already exists' });
    }

    const category = await Category.create({
      name,
    });

    return res.json(category);
  }

  async update(req, res) {
    const { id } = req.params;
    const { name } = req.body;

    const categoryId = await Category.findById(id);

    if (!categoryId) {
      return res.status(404).json({ error: 'Category ID does not found' });
    }
    categoryId.name = name;
    await categoryId.save();

    return res.json(categoryId);
  }

  async delete(req, res) {
    const { id } = req.params;

    const categoryId = await Category.findById(id);

    if (!categoryId) {
      return res.status(404).json({ error: 'Category ID does not found' });
    }
    await categoryId.remove();

    return res.status(204).send();
  }
}

export default new CategoryController();
