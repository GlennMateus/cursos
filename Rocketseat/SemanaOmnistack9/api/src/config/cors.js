var whitelist = ["http://localhost:3000", "http://172.17.3.129:3000"];

var corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log(origin);
      callback(null, true);
    } else {
      console.log(origin);
      console.log("------------------------------------------------");
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
  methods: "GET, POST"
};

module.exports = corsOptions;
