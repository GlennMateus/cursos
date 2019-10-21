// initiates server
const express = require("express");
const routes = express.Router();
const multer = require("multer");
const uploadConfig = require("./config/upload");

// controllers
const SessionController = require("./controllers/SessionController");
const SpotController = require("./controllers/SpotController");
const DashboardController = require("./controllers/DashboardController");
const BookingController = require("./controllers/BookingController");
const ApprovalController = require("./controllers/ApprovalController");
const RejectionController = require("./controllers/RejectionController");

const upload = multer(uploadConfig);

// GET :: req.query
// PUT/ POST/ DELETE :: req.params
// PUT/ POST :: req.body  =  quando há corpo de requisição

routes.post("/sessions", SessionController.store);

routes.get("/spots", SpotController.index);
routes.post("/spots", upload.single("thumbnail"), SpotController.store);

routes.get("/dashboard", DashboardController.show);

// User wants to create a booking using this spot
routes.post("/spots/:spot_id/bookings", BookingController.store);

routes.post("/bookings/:booking_id/approvals", ApprovalController.store);
routes.post("/bookings/:booking_id/rejections", RejectionController.store);

module.exports = routes;
