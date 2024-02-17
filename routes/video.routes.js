
module.exports = app => {
    const video = require("../controllers/download.youtube.controller")

    const router = require("express").Router()

    router.post("/download", video.downloadYoutubeVideo)
   
    app.use("/api/video", router)

}