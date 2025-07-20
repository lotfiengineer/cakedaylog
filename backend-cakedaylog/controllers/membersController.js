const Member = require("../model/member");
const Community = require("../model/community");

//** Members controllers */
const createMember = async (req, res) => {
  const { firstname, lastname, birthdate } = req.body;

  try {
    const lotfiengineerCommunity = await Community.findOne({
      author: "lotfiengineer",
    });

    if (!lotfiengineerCommunity) {
      return res.status(404).json({
        message: "Community was not found",
      });
    }

    lotfiengineerCommunity.members.push({
      firstname,
      lastname,
      birthdate,
    });

    await lotfiengineerCommunity.save();

    const newMember =
      lotfiengineerCommunity.members[lotfiengineerCommunity.members.length - 1];

    res.status(201).json({
      message: "New member to lotfiengineer community was added",
      member: newMember,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllMembers = async (req, res) => {
  try {
    const community = await Community.findOne({ author: "lotfiengineer" });
    if (!community) {
      res.status(404).json({
        message: "Community was not found",
      });
    }
    res.json(community.members);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getMemberById = (req, res) => {
  res.status(200).json({
    message: "Get community member by ID endpoint is not implemented yet",
  });
};

const updateMember = async (req, res) => {
  res.status(200).json({
    message: "Update community member endpoint is not implemented yet",
  });
};

const deleteMember = async (req, res) => {
  res.status(200).json({
    message: "Delete community member endpoint is not implemented yet",
  });
};

module.exports = {
  getAll: getAllMembers,
  getById: getMemberById,
  create: createMember,
  update: updateMember,
  delete: deleteMember,
};
