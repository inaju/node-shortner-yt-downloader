const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const db = require("./models/index")
const swaggerUi = require("swagger-ui-express")
const path = require('path');
const fs = require('fs');

const app = express()


db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("connected to database!")
}).catch(err => {
    console.log("Cannot connect to database", err)
    process.exit()
})

var corsOptions = {
    origin: "http://localhost:8081"
}

app.use(cors(corsOptions))
// create application/json parser
app.use(bodyParser.json());
// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }));
// parse some custom thing into a Buffer
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));
// parse an HTML body into a string
app.use(bodyParser.text({ type: 'text/html' }));
// parse an text body into a string
app.use(bodyParser.text({ type: 'text/plain' }));
// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: true }))

app.use("/api-docs", swaggerUi.serve)

app.use('/static', express.static('files'));

app.get('/stream/:fileName', (req, res) => {
    const fileName = req?.params?.fileName
    const filePath = path.join(__dirname, 'files', fileName);
    res.setHeader('Content-Disposition', `attachment; filename=download_${fileName}`);
    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
});

const PORT = process.env.PORT | 8080

require("./routes/tutorial.routes")(app)
require("./routes/link.routes")(app)
require("./routes/video.routes")(app)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
