import express from "express";
import dotenv from "dotenv";
import { dbConnect } from "./db/dbUtil";
import {testFileRoute} from "./routes/siteRoutes";
import GHRouter from "./routes/gitHubOAuthRouter";
import GRouter from "./routes/googleOAuthRouter";
import AuthRouter from "./routes/authRouter";


dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/test', testFileRoute);

app.use('/google', GRouter);
app.use('/github', GHRouter);

app.use('/', express.static('public'));



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