const User = require("../models/User");

// index, show, store, update, destroy

module.exports = {
  // store :: cria novos usuários
  async store(req, res) {
    const { email } = req.body;
    // verifica se o usuário existe e preenche a variável 'user'
    console.log(email)
    let user = await User.findOne({ email });
    console.log(user)
    if (!user) {
      // caso não exista então cria um novo usuário e preenche a variável 'user'
      user = await User.create({ email });
    }

    return res.json(user);
  }
};
