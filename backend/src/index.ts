import express from "express";
import dotenv from "dotenv";
import {createUser, dbConnect} from "./db/dbUtil";
import {testFileRoute, oAuthReturnRoute, authGitHub, oAuthLogin} from "./routes/userRoutes";
import axios from "axios";
import {IGitHubUser} from "./types/GitHubUser";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/test', testFileRoute);
app.get('/oauth', oAuthReturnRoute);
app.get('/auth', authGitHub);
app.use('/', express.static('public'));

app.get('/userdata', oAuthLogin)

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