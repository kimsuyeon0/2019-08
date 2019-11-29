import { Connection, createConnection } from "typeorm";
import postRouter from "./routes/post-router";
import channelRouter from "./routes/chnnel-router";
import errorHandler from "./middlewares/errorHandler";

export default class App {
  private static app: Express;
  private static connection: Connection;
  static async start() {
    return await createConnection()
      .then(connection => {
        this.connection = connection;
        return this.initializeExpress();
      })
      .catch(error => console.error("TypeORM Connection Error: ", error));
  }
  
  private static initializeExpress() {
    this.app = express();
    this.app.set("port", process.env.PORT || 3000);
    this.app.use(morgan("dev"));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser(process.env.COOKIE_SECRET));
    this.app.use("/api/posts", postRouter);
    this.app.use("/api/channels", channelRouter);
    this.app.use(errorHandler);
    return this.app;
  }