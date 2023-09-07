import AppFactory from "./presentation/factories/appFactory.js";
import DbFactory from "./data/factories/dbFactory.js";
import config from "./config/index.js";

void (async() =>
{
  const db = DbFactory.create(config.dbType);
  db.init(config.dbUri);

  const app = AppFactory.create();

  app.init();
  app.build();
  app.listen();
})();





















