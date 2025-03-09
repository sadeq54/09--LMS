import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import * as dynamoose from "dynamoose";
// routs imports


// configrations
dotenv.config();


// this is all u need to set up your database connection in dynamoose 
const isProduction = process.env.NODE_ENV === "production";
// production mode means we are in deployed mode

if (!isProduction) {
    dynamoose.aws.ddb.local();
}

const app = express();
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 3000;
if (!isProduction) {
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
}