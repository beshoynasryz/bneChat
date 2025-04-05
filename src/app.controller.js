  import connectDB from "./DB/dbConnection.js";
import { globalErrorHandler } from "./utils/globalErrorHandling/index.js";
import userRouter from "./modules/users/user.controller.js";

function bootstrap(app, express) {
 
    connectDB()
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use("/api/user" ,userRouter)
  
    app.get('/', (_req, res) => res.send('Hello on my social app'));
    app.use('*', (req, res, next) => {
      return next(new Error(`invalid route ${req.originalUrl}`, { cause: 404 }))
    });
      app.use(globalErrorHandler)
}

export default bootstrap;
