module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            fileNameLocal: String,
            expiryDate: String,
        },
        { timestamps: true }
    )
    const Video = mongoose.model(
        "video", schema
    );
    return Video
}