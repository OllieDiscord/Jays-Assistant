const { model, Schema } = require("mongoose");

module.exports = model(
    "BlacklistDB",
    new Schema({
        GuildID: String,
        UserID: String,
        Reason: String
    }),
);