import { PrismaClient } from "@prisma/client";
import express from 'express';
import cors from 'cors';
import bodyParser from "body-parser";
const prisma = new PrismaClient();
const app = express()
const port = 3000
app.use(express.json());
app.use(bodyParser.urlencoded());
app.use(cors());
app.get('/users', async function (req, res) {
    const allUsers = await prisma.users.findMany()
    res.json(allUsers);
})

app.post('/users', async function (req, res) {
    console.log(req.body);
    if (req.body.first_name != "" || req.body.last_name != "") {
        await prisma.users.create({
            data: {
                first_name: req.body.first_name,
                last_name: req.body.last_name
            }
        })
        return res.status(201).send({ msg: "Success user have been created!" });
    } else {
        return res.status(406).send({ msg: 'Please complete the following' });
    }
})

// app.post('/user')
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})