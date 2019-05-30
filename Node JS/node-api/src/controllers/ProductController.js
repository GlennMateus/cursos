const mongoose = require('mongoose');

const Product = mongoose.model('Product');

module.exports = {
  async index(req, res) {
    const { page = 1 } = req.query;

    const products = await Product.paginate({}, { page, limit: 10 });

    return res.json(products);
  },

  async detail(req, res) {
    const product = await Product.findById(req.params.id);

    return res.json(product);
  },

  async create(req, res) {
    const product = await Product.create(req.body);

    return res.json(product);
  },

  async update(req, res) {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      //Retorna o dado atualizado. Sem isso ele irá retornar o dado antigo
      new: true
    });

    return res.json(product);
  },

  async destroy(req, res) {
    await Product.findByIdAndRemove(req.params.id);

    return res.send('Produto removido com sucesso');
  }
};
