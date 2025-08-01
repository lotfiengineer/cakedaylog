const express = require("express");
const router = express.Router();
const Event = require("../model/event");

const createEvent = async (req, res) => {
  const { title, description, communityId, date } = req.body;

  try {
    const event = new Event({
      title,
      description,
      community: communityId,
      date,
      createdBy: req.userId,
    });

    await event.save();

    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const getEventByCommunityId = async (req, res) => {
  const { communityId } = req.params;

  try {
    const events = await Event.find({
      community: communityId,
    }).sort({ date: 1 });

    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteEventById = async (req, res) => {
  const { eventId } = req.params;

  try {
    const event = await Event.findById(eventId);

    if (event.createdBy.toString() !== req.userId)
      return res.status(403).json({
        message: "You don't have access to remove this event",
      });

    await event.deleteOne();

    res.status(200).json({
      message: "event Deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  create: createEvent,
  getByCommunityId: getEventByCommunityId,
  deleteById: deleteEventById,
};
