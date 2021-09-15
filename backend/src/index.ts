import express from "express";
import dotenv from "dotenv";
import {dbConnect} from "./db/dbUtil";
import {testFileRoute, oAuthReturnRoute, authGitHub} from "./routes/userRoutes";
import axios from "axios";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/test', testFileRoute);
app.get('/oauth', oAuthReturnRoute);
app.get('/auth', authGitHub);
app.use('/', express.static('public'))

app.get('/userdata', (req, res) => {

  axios.get('https://api.github.com/user', {
    headers: {
      Authorization: 'token '+req.query.token
    }
  }).then(_res => {
    res.status(200);
    res.send(_res.data);
    res.end();
  }).catch(err => {
    res.status(500);
    res.send(err);
    res.end();
  });
})

dbConnect(
  process.env.MONGODB_HOST!,
  process.env.MONGODB_PORT!,
  process.env.MONGODB_AUTHDATABASE!,
  process.env.MONGODB_USER!,
  process.env.MONGODB_PASSWORD!
).then(msg => {
  console.log(msg);
  app.listen(process.env.PORT, () => {
    console.log(`API running on port ${process.env.PORT}`);
  });
}).catch(err => {
  console.log(err);
  process.exit(-1);
});