const Member = require("../model/member");
const Community = require("../model/community");

//** Members controllers */
const createMember = async (req, res) => {
  const { firstname, lastname, birthdate } = req.body;
  const { communityId } = req.params;

  try {
    const community = await Community.findById(communityId);

    console.log(community);

    if (!community) {
      return res.status(404).json({
        message: "Community was not found",
      });
    }

    community.members.push({
      firstname,
      lastname,
      birthdate,
    });

    await community.save();

    const newMember = community.members[community.members.length - 1];

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
    const community = await Community.findById(req.params.communityId);
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
  create: createMember,
  getAll: getAllMembers,
  getById: getMemberById,
  update: updateMember,
  delete: deleteMember,
};
