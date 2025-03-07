import express from 'express';

import dotenv from 'dotenv';
import bootstrap from './src/app.controller.js';
dotenv.config();
const app = express();
const port = 3000;

bootstrap(app, express);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});
