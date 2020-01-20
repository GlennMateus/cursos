const Dev = require("../models/Dev");
const parseStringToArray = require("../utils/parseStringToArray");

module.exports = {
  async index(req, res) {
    const { latitude, longitude, techs, range = 10 } = req.query;
    console.log(longitude);
    console.log(`=> searching developers in a range of ${range} km`);
    const techsArray = parseStringToArray(techs);

    const devs = await Dev.find({
      techs: {
        $in: techsArray
      },
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude]
          },
          $maxDistance: range * 1000
        }
      },
      dev_status: true
    });
    console.log(`==> found ${devs.length} near you`);

    return res.json({ count: devs.length, devs });
  }
};
