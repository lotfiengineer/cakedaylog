const mongoose = require("mongoose");
const Community = require("../model/community");

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("✅ Connected to MongoDB ✅");

    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    const exists = collections.some((col) => col.name === "communities");

    if (!exists) {
      await Community.createCollection();

      await Community.create({
        author: "lotfiengineer",
        members: [],
      });

      const lotfiengineerCommunity = await Community.findOne({
        author: "lotfiengineer",
      });

      lotfiengineerCommunity.members.push({
        firstname: "Mohammad",
        lastname: "Lotfi",
        birthdate: new Date("2000-11-24"),
      });

      lotfiengineerCommunity.save();

      console.log("Community with author 'lotfiengineer' is created");
    } else {
      console.log(
        "Community with author 'lotfiengineer' already exists. Happy developing :)"
      );
    }

    // const db = mongoose.connection;
    // db.on("error", (error) => console.error(error));
    // db.once("open", () => console.log("Connected to Database"));
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  }
};

module.exports = connectToDB;
