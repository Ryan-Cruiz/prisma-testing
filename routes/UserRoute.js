import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function userRoute(fastify) {
    fastify.get('/users', async function (req, reply) {
        try {
            const allUsers = await prisma.users.findMany()
            return allUsers;
        } catch (e) {
            console.log(e);
            return reply.status(500).send({ msg: `Error Please try again` });
        }
    })

    fastify.post('/users', async (req, reply) => {
        console.log(req.body);
        try {
            if (req.body.first_name != "" && req.body.last_name != "") {
                await prisma.users.create({
                    data: {
                        first_name: req.body.first_name,
                        last_name: req.body.last_name
                    }
                })
                return reply.status(201).send({ msg: "Success user have been created!" });
            } else {
                let errMsg = {}
                if (req.body.first_name == "") {
                    errMsg['first_name'] = "First name is required field.";
                }
                if (req.body.last_name == "") {
                    errMsg['last_name'] = "Last name is required field.";
                }
                return reply.status(406).send({
                    msg: errMsg,
                });
            }
        } catch (e) {
            // throw e;
            console.log(e);
            return reply.status(500).send({ msg: `Error Please try again ${e}` });
        }
    })
    fastify.delete('/user/:id', async function () {

    })
}