const socketio = require("socket.io");
const parseStringToArray = require("./utils/parseStringToArray");
const distanceCalculator = require("./utils/distanceCalculator");

const connections = [];
let io;

exports.setupWebsocket = server => {
  console.log("Configuring socket.io");
  io = socketio(server);

  io.on("connection", socket => {
    const { latitude, longitude, techs } = socket.handshake.query;
    console.log(socket.id);
    console.log(socket.handshake.query);
    connections.push({
      id: socket.id,
      coordinates: {
        latitude: Number(latitude),
        longitude: Number(longitude)
      },
      techs: parseStringToArray(techs)
    });
  });
};

exports.findConnections = (coordinates, techs) => {
  return connections.filter(connection => {
    return (
      distanceCalculator(coordinates, connections.coordinates) < 10 &&
      connection.techs.some(item => techs.includes(item))
    );
  });
};

exports.sendMesage = (to, message, data) => {
  to.forEach(connection => {
    io.to(connection.id).emit(message, data);
  });
};
