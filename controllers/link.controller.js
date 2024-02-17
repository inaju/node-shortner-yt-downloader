const db = require("../models");
require('dotenv').config()
const generateRandomString = require("../utils/generateRandomString");

const Link = db.link;


const findUrlFunc = (condition) => {

    return Link.find(condition)
        .then(data => {
            return data
        }).catch(err => {
            return "URL not found"

        })
}
// create and save new tutorial
exports.create = async (req, res) => {
    const url = req.body.url

    const condition = {
        url: url
    }
    // validate request
    if (!url) {
        res.status(400).send({ message: "url field cannot be empty" })
        return;
    }

    const checkIfUrlIsPresent = await findUrlFunc(condition)

    if (checkIfUrlIsPresent.length > 0) {
        res.send({
            data: checkIfUrlIsPresent,
            message: "url found"
        })
    } else {

        const newLink = new Link({
            shortened_url: generateRandomString(10),
            url: url,
            hide: req.body.hide ? req.body.hide : false
        })
        console.log(process.env.BASE_URL, 'process.env.BASE_URL')


        newLink
            .save(newLink)
            .then((data) => {
                res.send(data)
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some Error Occured while saving Links"
                })
            })
    }



}

exports.reRouteUrl = async (req, res) => {
    const url = req.params.shortened_url
    // const url = req.body.shortened_url

    if (!url) {
        res.status(404).send({ message: "Please pass in the url" })
    } else {
        const condition = {
            shortened_url: url
        }

        const checkIfUrlIsPresent = await findUrlFunc(condition)

        if (checkIfUrlIsPresent.length > 0) {
            res.send({ data: checkIfUrlIsPresent, reRouteUrl: process.env.BASE_URL + "/" + checkIfUrlIsPresent[0].shortened_url, message: "e done be naa" })
        } else {
            res.status(400).send({ message: "not found" })

        }

    }
}

//retrieve all tutorials from database
exports.findAll = (req, res) => {
    const url = req.query.url
    var condition = url ? { url: { $regex: new RegExp(url), $options: "i" } } : {};

    Link.find(condition)
        .then(data => {
            res.send(data)
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some Error occured while retrieving tutorials"
            })
        })
}


// //find single tutorial with an id
// exports.findOne = (req, res) => {
//     const id = req.params.id;

//     Tutorial.findById(id)
//         .then(data => {
//             if (!data) {
//                 res.status(404).send({ message: "Tutorial with Id not found " + id })
//             }
//             else res.send(data)
//         }).catch(err => {
//             res.status(500).send({
//                 message: err.message || "Some Error occured while retrieving tutorial with id: " + id
//             })
//         })
// }
// //Uppdate single tutorial with an id
// exports.update = (req, res) => {
//     if (!req.body) {
//         return res.status(400).send({
//             message: "Data to update cannot be empty"
//         })
//     }

//     const id = req.params.id;

//     Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
//         .then(data => {
//             if (!data) {
//                 res.status(404).send({
//                     message: `Cannot update tutorial with id: ${id} Tutorial not found`
//                 })
//             }
//             else res.send({ message: "Tutorial was updated successfully" })
//         }).catch(err => {
//             res.status(500).send({
//                 message: err.message || "Some Error occured while updating tutorial with id: " + id
//             })
//         })
// }

// //delete single tutorial
// exports.delete = (req, res) => {
//     if (!req.body) {
//         return res.status(400).send({
//             message: "Data to update cannot be empty"
//         })
//     }

//     const id = req.params.id;

//     Tutorial.findByIdAndRemove(id, req.body, { useFindAndModify: false })
//         .then(data => {
//             if (!data) {
//                 res.status(404).send({
//                     message: `Cannot delete tutorial with id: ${id} Tutorial not found`
//                 })
//             }
//             else res.send({ message: "Tutorial was deleted successfully" })
//         }).catch(err => {
//             res.status(500).send({
//                 message: err.message || "Some Error occured while updating tutorial with id: " + id
//             })
//         })

// }

// //delete all tutorials
// exports.deleteAll = (req, res) => {

// }
// //Find all Published Tutorials

// exports.findAllPublished = (req, res) => {
//     Tutorial.find({ published: true })
//         .then(data => {
//             if (!data) {
//                 res.status(404).send({ message: "Tutorial with published true not found " })
//             }
//             else res.send(data)
//         }).catch(err => {
//             res.status(500).send({
//                 message: err.message || "Some Error occured while retrieving tutorial with "
//             })
//         })

// }