bodyParser = require('body-parser').json()

module.exports = app => {
    const link = require("../controllers/link.controller")

    const router = require("express").Router()

    router.post("/create-short-url", link.create)
    router.get("/", link.findAll)
    router.get("/re-route/:shortened_url", link.reRouteUrl)

    // router.get("/published", tutorials.findAllPublished)
    // router.get("/:id", tutorials.findOne)
    // router.put("/:id", tutorials.update)
    // router.delete("/:id", tutorials.delete)
    app.use("/api/link", router)

}