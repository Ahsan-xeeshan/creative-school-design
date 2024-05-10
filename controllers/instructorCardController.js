const classSchema = require("../models/classSchema");

async function instructorCardController(req, res) {
  try {
    const { instructorid } = req.query;

    const users = await classSchema.find({ instructorid: instructorid });

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}

module.exports = instructorCardController;
