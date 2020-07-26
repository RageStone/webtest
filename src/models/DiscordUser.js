const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    discordId: {type: String, require: true},
    username: {type: String, require: true},
    guilds:  {type: Array, required: true}
})

const DiscordUser = module.exports = mongoose.model('User', UserSchema)