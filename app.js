import express from 'express';
import cors from 'cors';
import bodyParser from "body-parser";
import UserRoute from './routes/UserRoute.js';
const app = express()
const port = 3000
app.use(express.json());
app.use(bodyParser.urlencoded());
app.use(cors());
app.use(UserRoute);

app.listen(port, () => {
    console.log(`listening on port http://localhost:${port}`)
})