import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import bootstrap from './src/app.controller.js';
dotenv.config({ path: path.resolve('./src/config/.env ') });
const app = express();
const port =process.env.PORT || 3001;

bootstrap(app, express);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});
