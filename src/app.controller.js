// import connectDB from './src/DB/ConnectionDB.js';  
import { globalErrorHandler } from "./utils/globalErrorHandling/index.js";


function bootstrap(app, express) {
    // connectDB();  
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
  
    app.get('/', (_req, res) => res.send('Hello on my social app'));
    app.use('*', (req, res, next) => {
        res.status(404).send({message: `Route ${req.originalUrl} not found`});
    });
      app.use(globalErrorHandler)
}

export default bootstrap;
