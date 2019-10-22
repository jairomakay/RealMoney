import { Injectable } from "@angular/core";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite/ngx";
import { SQLitePorter } from "@ionic-native/sqlite-porter/ngx";
import { Platform } from "@ionic/angular";

@Injectable({
  providedIn: "root"
})
export class CreateDBService {
  database: SQLiteObject;

  constructor(
    private sqlite: SQLite,
    private sqlitePorter: SQLitePorter,
    private platform: Platform
  ) {
    this.platform.ready().then(() => {
      this.sqlite
        .create({
          name: "data.db",
          location: "default"
        })
        .then((db: SQLiteObject) => {
          this.database = db;
          this.createTables();
        });
    });
  }

  public createTables() {
    let sql =
      "CREATE TABLE IF NOT EXISTS category (id integer primary key AUTOINCREMENT NOT NULL, name varchar(255));" +
      "CREATE TABLE IF NOT EXISTS expense (id integer primary key AUTOINCREMENT NOT NULL, value real, [date] DATE, image text, category_id integer, FOREIGN KEY(category_id) REFERENCES category(id));";

    this.sqlitePorter
      .importSqlToDb(this.database, sql)
      .then(() => console.log("Sql importado "))
      .catch(e => console.error(e));
  }
}
