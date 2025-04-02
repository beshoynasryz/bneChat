  import connectDB from "./DB/dbConnection.js";
import { globalErrorHandler } from "./utils/globalErrorHandling/index.js";


function bootstrap(app, express) {
 
    connectDB()
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
  
    app.get('/', (_req, res) => res.send('Hello on my social app'));
    app.use('*', (req, res, next) => {
      return next(new Error(`invalid route ${req.originalUrl}`, { cause: 404 }))
    });
      app.use(globalErrorHandler)
}

export default bootstrap;
