import express, { Application , Request , Response}  from "express";


const app : Application = express();
app.use(express.json())

app.post("/users", (req : Request, res: Response) => {
    const { password, username } = req.body;
    if (!password || !username) {
        res.status(400).send({ status : 400 })
        return;
    }
    res.status(200).send({ userId: 0 })
})

export default app;