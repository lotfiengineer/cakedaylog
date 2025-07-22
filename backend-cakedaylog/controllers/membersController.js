const Member = require("../model/member");
const Community = require("../model/community");

//** Members controllers */
const createMember = async (req, res) => {
  const { firstname, lastname, birthdate } = req.body;
  const { communityId } = req.params;

  try {
    const community = await Community.findById(communityId);

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
  const { communityId, memberId } = req.params;
  const { firstname, lastname, birthdate } = req.body;

  const community = await Community.findById(communityId);

  const member = community.members.find((m) => m._id.toString() === memberId);

  member.firstname = firstname;
  member.lastname = lastname;
  member.birthdate = birthdate;

  community.save();

  res.status(200).json({
    member,
  });
};

const deleteMember = async (req, res) => {
  const { communityId, memberId } = req.params;

  const community = await Community.findById(communityId);

  community.members = community.members.filter(
    (m) => m._id.toString() !== memberId
  );

  community.save();

  res.status(200).json({
    res: community.members,
    communityId,
    memberId,
  });
};

module.exports = {
  create: createMember,
  getAll: getAllMembers,
  getById: getMemberById,
  update: updateMember,
  delete: deleteMember,
};
