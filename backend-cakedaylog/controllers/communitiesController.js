const Community = require("../model/community");

//** Community controllers */

const createCommunity = async (req, res) => {
  const { name } = req.body;

  if (!name)
    return res.status(400).json({
      message: "Community name is required!",
    });

  try {
    if (await Community.findOne({ name: name })) {
      return res.status(400).json({
        message: `Community with the name '${name}' already exists`,
      });
    }

    const newCommunity = new Community({
      name,
      authorId: req.userId,
      members: [],
      createdAt: new Date(),
    });

    newCommunity.save();

    res.status(201).json(newCommunity);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllCommunities = async (req, res) => {
  try {
    const communities = await Community.find()
      .select("name authorId createdAt")
      .populate("authorId", "fullname email");

    const formattedCommunities = communities.map((community) => ({
      _id: community._id,
      name: community.name,
      createdAt: community.createdAt,
      author: {
        _id: community.authorId._id,
        fullname: community.authorId.fullname,
        email: community.authorId.email,
      },
    }));

    res.status(200).json(formattedCommunities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getCommunityById = async (req, res) => {
  try {
    const community = await Community.findById(req.params.id).select("name");

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
  try {
    const community = await Community.findById(req.params.id);

    if (!community) {
      res.status(404).json({
        message: "Community was not found",
      });
    }

    community.name = req.body.name;

    await community.save();

    res.status(200).json(community);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

  res.status(200).json({
    message: "Update community endpoint is not implemented yet",
  });
};

const deleteCommunity = async (req, res) => {
  try {
    const community = await Community.findById(req.params.id);

    if (!community) {
      res.status(404).json({
        message: "Community was not found",
      });
    }

    await community.deleteOne();

    res.status(200).json(community);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  create: createCommunity,
  getAll: getAllCommunities,
  getById: getCommunityById,
  update: updateCommunity,
  delete: deleteCommunity,
};
