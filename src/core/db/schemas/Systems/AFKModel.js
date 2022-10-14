const { model, Schema } = require("mongoose");

module.exports = model(
    "AfkDB",
    new Schema({
        GuildID: String,
        UserID: String,
        Status: String,
        Time: String
    }),
);