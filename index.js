import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import bootstrap from './src/app.controller.js';

// Load environment variables from .env file
dotenv.config({ path: path.resolve('./src/config/.env') });

const app = express();
const port = process.env.PORT || 3001;

// Call the bootstrap function (probably to set up routes or middleware)
bootstrap(app, express);
// Start the server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});
