const axios = require("axios");
const Dev = require("../models/Dev");
const { findConnections, sendMesage } = require("../websocket");
const parseStringToArray = require("../utils/parseStringToArray");

// index, show, store, update, destroy

module.exports = {
  async index(req, res) {
    const devs = await Dev.find();

    return res.json(devs);
  },

  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;
    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const githubResponse = await axios.get(
        `https://api.github.com/users/${github_username}`
      );
      const { login, name, avatar_url, bio } = githubResponse.data;

      const techsArray = parseStringToArray(techs);
      const location = {
        type: "Point",
        coordinates: [longitude, latitude]
      };

      dev = await Dev.create({
        name: name || login,
        github_username,
        avatar_url,
        bio,
        techs: techsArray,
        location
      });

      const sendSocketMessageTo = findConnections(
        {
          latitude,
          longitude
        },
        techsArray
      );

      sendMesage(sendSocketMessageTo, "new-dev", dev);
    } else if (!dev.dev_status) {
      dev.dev_status = true;
      dev.save();
    }

    return res.json(dev);
  },

  async update(req, res) {
    const { _id } = req.params;
    const { dev_status, range, data } = req.body;
    const { name, techs, bio } = data;
    let techsArray = null;
    if (techs) {
      techsArray = parseStringToArray(techs);
    }

    let dev = await Dev.findOne({ _id });
    const { github_username } = dev;
    const githubResponse = await axios.get(
      `https://api.github.com/users/${github_username}`
    );

    const { avatar_url } = githubResponse.data;

    const update = {
      name: name || dev.name,
      avatar_url: avatar_url || dev.avatar_url,
      bio: bio || dev.bio,
      techs: techsArray || dev.techs,
      range: range || dev.range,
      dev_status: dev_status || dev.dev_status
    };

    dev = await Dev.findOneAndUpdate(
      { github_username },
      { $set: update },
      { new: true }
    );

    var status = 200;
    var message = `f*ck it worked!`;
    return res.json({
      status,
      message
      //   dev
    });
  },

  async destroy(req, res) {
    const { _id } = req.params;
    console.log(_id);
    const dev = await Dev.findOne({ _id });

    if (dev) {
      console.log(`deleting user \n${dev}`);
      dev.dev_status = false;
      dev.save();
      var status = 200;
      var message = `user ${dev.name} has been deleted!`;
    } else {
      status = 401;
      message = `user ${id} not found :/`;
    }

    return res.json({
      status,
      message
    });
  }
};
