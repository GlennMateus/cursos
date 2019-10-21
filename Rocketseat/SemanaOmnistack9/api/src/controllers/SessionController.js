const User = require("../models/User");

// index, show, store, update, destroy

module.exports = {
  // store :: cria novos usuários
  async store(req, res) {
    const { email } = req.body;
    // verifica se o usuário existe e preenche a variável 'user'
    let user = await User.findOne({ email });
    if (!user) {
      // caso não exista então cria um novo usuário e preenche a variável 'user'
      user = await User.create({ email });
    }

    return res.json(user);
  }
};
