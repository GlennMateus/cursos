const Spot = require("../models/Spot");
const User = require("../models/User");

// index, show, store, update, destroy

module.exports = {
  async index(req, res) {
    const { tech } = req.query;

    const spots = await Spot.find({ techs: tech });

    return res.json(spots);
  },

  // store :: cria novos usuários
  async store(req, res) {
    const { filename } = req.file;
    const { company, techs, price } = req.body;
    const { user_id } = req.headers;

    let user = await User.findById(user_id);
    // Check if user does exist or not
    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    } else {
      let spot = await Spot.findOne({ user: user_id, company });

      // Check if spot was already created by this user or not
      if (!spot) {
        spot = await Spot.create({
          user: user_id,
          thumbnail: filename,
          company,
          techs: techs.split(",").map(tech => tech.trim()),
          price
        });
        return res.json(spot);
      } else {
        return res.json(spot);
      }
    }
  }
};
