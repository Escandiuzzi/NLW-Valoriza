import "reflect-metadata";
import "express-async-errors"

import express, { Request, Response, NextFunction } from "express"
import { router } from "./routes";
import cors from "cors"

import { validateDotEnv } from "./helpers/validateDotEnv";

import "./database"

//require('dotenv').config({path: __dirname + '/.env'})
require('dotenv').config('./.env')

validateDotEnv();

const app = express();

app.use(cors());

app.use(express.json());

app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
        return response.status(400).json({
            error: err.message
        });
    }

    return response.status(500).json({
        status: "error",
        message: "Internal Server Error"
    });
})


app.listen(process.env['PORT'] || 5000, () => console.log("Server is running"));