import express from 'express';
import bodyParser from 'body-parser'
import morgan from 'morgan'
import 'dotenv/config'
import adaptrequest from './helpers/adapt-request.js';
import handleSearchRequest from './search/index.js';

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json())

app.get("/", (req, res) => {
    res.send("Kodo Task, This app is running, please request to correct endpoint");
});

app.post("/search", searchController);

function searchController (req, res) {
    const httprequest = adaptrequest(req);
    handleSearchRequest(httprequest)
        .then(({headers, statusCode, data }) => {
            res.
                set(headers)
                .status(statusCode)
                .send(data)
        }).catch(e => res.status(500).end());
}

app.all('/*', (req, res) => {
    res.send('Not found, Please request to correct endpoints');
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
});