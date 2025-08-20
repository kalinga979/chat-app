import express from 'express';
import { pingDb, startDb } from './models/mongo.ts';
const app = express();
// Connect to Mongo DBerro(
try {
    await startDb();
    setTimeout(() => {
        pingDb();
    }, 8000);
}
catch (err) {
    console.error(err);
    console.log("Failed to connect to mongodb, Stopping server!");
    process.exit(1);
}
app.get("/", (_req, res) => {
    res.send("Hello World!");
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
