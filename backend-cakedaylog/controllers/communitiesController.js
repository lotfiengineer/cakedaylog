const Member = require("../model/member");
const Community = require("../model/community");

const getAllCommunities = async (req, res) => {
  try {
    const communities = await Community.find().select("author createdAt");

    res.status(200).json(communities);
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

const createNewMember = async (req, res) => {
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

const deleteMember = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).json({
        message: `Member ID ${req.params.id} was not found`,
      });
    }

    await member.deleteOne();
    res.json({
      message: `Member ID ${req.params.id} was deleted successfully`,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getMember = (req, res) => {
  const foundMember = membersList.find(
    (member) => member.id === parseInt(req.params.id)
  );
  if (!foundMember) {
    return res.status(400).json({
      message: `Member ID ${req.params.id} not found`,
    });
  }
  res.json(foundMember);
};

module.exports = {
  getAllCommunities,
  getAllMembers,
  createNewMember,
  deleteMember,
  getMember,
};
