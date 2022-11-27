const { model, Schema } = require("mongoose");

module.exports = model(
    "BlockDB",
    new Schema({
        GuildID: String,
        UserID: String,
        Reason: String
    }),
);