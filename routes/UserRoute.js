import express from 'express';
import { PrismaClient } from "@prisma/client";
const Router = express.Router();
const prisma = new PrismaClient();
Router.get('/users', async function (req, res) {
    try {
        const allUsers = await prisma.users.findMany()
        res.json(allUsers);
    } catch (e) {
        console.log(e);
        return res.status(500).send({ msg: `Error Please try again` });
    }
})

Router.post('/users', async function (req, res) {
    try {
        console.log(req.body, req.query);
        if (req.body.first_name != "" && req.body.last_name != "") {
            await prisma.users.create({
                data: {
                    first_name: req.body.first_name,
                    last_name: req.body.last_name
                }
            })
            return res.status(201).send({ msg: "Success user have been created!" });
        } else {
            let errMsg = {}
            if (req.body.first_name == "") {
                errMsg['first_name'] = "First name is required field.";
            }
            if (req.body.last_name == "") {
                errMsg['last_name'] = "Last name is required field.";
            }
            return res.status(406).send({
                msg: errMsg,
            });
        }
    } catch (e) {
        console.log(e);
        return res.status(500).send({ msg: `Error Please try again` });
    }
})

export default Router;