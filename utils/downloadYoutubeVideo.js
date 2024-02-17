const fs = require('fs');
const ytdl = require('ytdl-core');

async function downloadVideo(videoUrl, outputFilePath, res) {
    var status = "pending"
    try {
        const videoInfo = await ytdl.getInfo(videoUrl);
        const videoFormat = ytdl.chooseFormat(videoInfo.formats, { quality: 'highest' });

        if (videoFormat) {
            const videoStream = ytdl(videoUrl, { format: videoFormat });

            videoStream.pipe(fs.createWriteStream(outputFilePath));

            return new Promise((resolve, reject) => {
                videoStream.on('end', () => {
                    console.log('Video downloaded successfully.');
                    resolve("success");
                    return "this is the data"
                });

                videoStream.on('error', (error) => {
                    console.error('Error downloading video:', error);
                    reject(error);
                    return false
                });
            }
            )
            // return status


        } else {
            console.error('No available formats found for the video.');
        }


    } catch (error) {
        console.error('Error getting video info:', error);
    }

}

module.exports = downloadVideo

