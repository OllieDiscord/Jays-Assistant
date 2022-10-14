const { model, Schema } = require("mongoose");

module.exports = model(
    "WarningDB",
    new Schema({
        CaseID: String,
        GuildID: String,
        UserID: String,
        UserTag: String,
        Content: Array
    }),
);