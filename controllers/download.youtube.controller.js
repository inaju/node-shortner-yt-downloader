const db = require("../models");
require('dotenv').config()

const downloadVideo = require("../utils/downloadYoutubeVideo");
const generateRandomString = require("../utils/generateRandomString");

const Video = db.video;


// get the youtube url via a post request
// run the download function to download the video to my local server
// serve the file back to the user

// future
// allow users to add ss to any youtube url and download the video 


exports.downloadYoutubeVideo = async (req, res) => {
    const youtubeUrl = req.body.youtubeUrl
    const fileName = generateRandomString(10)
    const message = await downloadVideo(youtubeUrl, `files/${fileName}.mp4`, res)
    console.log(message, 'messagemessagemessagemessagemessagemessage')
    if (message == "success") {
        const newVideo = new Video({
            fileName: fileName,
        })
        newVideo
            .save(newVideo)
            .then((data) => {
                res.send({
                    downloadUrl: process.env.BASE_URL + "/stream/" + fileName + ".mp4"
                })
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some Error Occured while saving Video"
                })
            })
    }
    else {
        res.status(500).send({
            message: err.message || "Some Error Occured while saving Video"
        })
    }
}



