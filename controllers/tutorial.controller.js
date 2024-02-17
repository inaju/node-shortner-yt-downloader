const db = require("../models")

const Tutorial = db.tutorials;

// create and save new tutorial
exports.create = async (req, res) => {
    const title = req.body.title

    // validate request
    if (!title) {
        res.status(400).send({ message: "content cannot be empty" })
        return;
    }

    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

    const checkIfTutorialPresent = await Tutorial.find(condition)
        .then(data => {
            return data
        })
    console.log(checkIfTutorialPresent, 'checkIfTutorialPresent')

    if (checkIfTutorialPresent.length > 0) {
        res.status(500).send({
            message: "Please Create another post with a title not used before"
        })
    } else {


        const tutorial = new Tutorial({
            title: req.body.title,
            description: req.body.description,
            published: req.body.published ? req.body.published : false
        })

        tutorial
            .save(tutorial)
            .then((data) => {
                res.send(data)
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some Error Occured while creating tutorial"
                })
            })
    }


}

//retrieve all tutorials from database
exports.findAll = (req, res) => {
    const title = req.query.title
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

    Tutorial.find(condition)
        .then(data => {
            res.send(data)
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some Error occured while retrieving tutorials"
            })
        })
}

//find single tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Tutorial.findById(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "Tutorial with Id not found " + id })
            }
            else res.send(data)
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some Error occured while retrieving tutorial with id: " + id
            })
        })
}
//Uppdate single tutorial with an id
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update cannot be empty"
        })
    }

    const id = req.params.id;

    Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update tutorial with id: ${id} Tutorial not found`
                })
            }
            else res.send({ message: "Tutorial was updated successfully" })
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some Error occured while updating tutorial with id: " + id
            })
        })
}

//delete single tutorial
exports.delete = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update cannot be empty"
        })
    }

    const id = req.params.id;

    Tutorial.findByIdAndRemove(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete tutorial with id: ${id} Tutorial not found`
                })
            }
            else res.send({ message: "Tutorial was deleted successfully" })
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some Error occured while updating tutorial with id: " + id
            })
        })

}

//delete all tutorials
exports.deleteAll = (req, res) => {

}
//Find all Published Tutorials

exports.findAllPublished = (req, res) => {
    Tutorial.find({ published: true })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "Tutorial with published true not found " })
            }
            else res.send(data)
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some Error occured while retrieving tutorial with "
            })
        })

}