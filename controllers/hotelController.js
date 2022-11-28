const { restart } = require("nodemon");
const Hotel = require("../models/hotelModel");

exports.getAllHotels = async (req, res, next) => {
  // Execute query
  try {
    const hotels = await Hotel.find();

    res.status(200).json({
      data: {
        hotels: hotels,
      },
    });
  } catch (error) {
    res.status(404).json({
      message: error,
    });
  }
};

exports.getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      res.status(404).json({
        message: "Can not find a hotel with that ID",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        hotel: hotel,
      },
    });
  } catch (error) {
    res.status(404).json({
      message: error,
    });
  }
};

exports.createHotel = async (req, res, next) => {
  try {
    const newHotel = await Hotel.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        hotel: newHotel,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!hotel) {
      res.status(404).json({
        message: "Can not find a hotel with that ID",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        hotel,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findByIdAndDelete(req.params.id);

    if (!hotel) {
      res.status(404).json({
        message: "Can not find a hotel with that ID",
      });
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
