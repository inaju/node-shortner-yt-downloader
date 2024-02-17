const dbConfig = require("../config/db.config")

const mongoose = require("mongoose")

mongoose.Promise = global.Promise

const db = {}
db.mongoose = mongoose;
db.url = dbConfig.url;
db.tutorials = require("./tutorial.model.js")(mongoose)
db.link = require("./link.model.js")(mongoose)
db.video = require("./video.model.js")(mongoose)

module.exports=db