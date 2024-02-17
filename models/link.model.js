module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            shortened_url: String,
            url: String,
            hide: Boolean
        },
        { timestamps: true }
    )
    const Link = mongoose.model(
        "link", schema
    );
    return Link
}