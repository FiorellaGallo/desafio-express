
import config from "../config/index.js";
import AppFactory from "../presentation/factories/appFactory.js";
import DbFactory from "../data/factories/dbFactory.js";

const initServer = async() =>
{
  const db = DbFactory.create(config.dbType);
  db.init(config.dbUri);

  const app = AppFactory.create();

  app.init();
  app.build();

  return {
    app,
    db
  }
};

export default initServer;