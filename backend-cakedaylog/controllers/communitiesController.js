const Community = require("../model/community");

//** Community controllers */

const createCommunity = async (req, res) => {
  const { author } = req.body;

  try {
    if (await Community.findOne({ author: author })) {
      return res.status(400).json({
        message: `Community with author ${author} already exists`,
      });
    }

    const newCommunity = new Community({
      author,
      members: [],
      createdAt: new Date(),
    });

    newCommunity.save();

    res.status(201).json({
      message: "New community was created",
      community: newCommunity,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllCommunities = async (req, res) => {
  try {
    const communities = await Community.find().select("author createdAt");

    res.status(200).json(communities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getCommunityById = async (req, res) => {
  try {
    const community = await Community.findById(req.params.id).select("author");

    if (!community) {
      res.status(404).json({
        message: "Community was not found",
      });
    }

    res.status(200).json(community);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateCommunity = async (req, res) => {
  res.status(200).json({
    message: "Update community endpoint is not implemented yet",
  });
};

const deleteCommunity = async (req, res) => {
  res.status(200).json({
    message: "Delete community endpoint is not implemented yet",
  });
};

module.exports = {
  create: createCommunity,
  getAll: getAllCommunities,
  getById: getCommunityById,
  update: updateCommunity,
  delete: deleteCommunity,
};
