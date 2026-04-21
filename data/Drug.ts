import * as SQLite from 'expo-sqlite';
import DrugItem from './DrugItem';

export class Drug {

  name: string;
  qtd: number;
  boxQtd: number;
  id: number;
  time: string;
  config: string;

  db: SQLite.SQLiteDatabase;

  constructor();
  constructor(name = '', qtd = 0, boxQtd = 0, time = '', config = '') {
    this.migrateDbIfNeeded(SQLite.openDatabaseSync('RememberMe.db'));
    this.db = SQLite.openDatabaseSync('RememberMe.db');
    this.name = name;
    this.qtd = qtd;
    this.boxQtd = boxQtd;
    this.time = time;
    this.config = config;
  }


  async saveDrug(name: string, qtd: number, boxQtd: number, time: string, config:string) {
    this.name = name;
    this.qtd = qtd;
    this.save();
  }

  async save() {
    const result = await this.db.runSync('INSERT INTO Drug (name, qtd, boxQtd, time, config) VALUES (?, ?, ?, ?, ?)', this.name, this.qtd, this.qtd, this.time, this.config);
    const allRows = await this.db.getAllAsync('SELECT * FROM Drug');
  }

  async getAll():Promise<DrugItem[]> {
    const allRows :DrugItem[] = await this.db.getAllAsync('SELECT * FROM Drug');
    return allRows;
  }

  migrateDbIfNeeded(db: SQLite.SQLiteDatabase) {
    const DATABASE_VERSION = 1;
    let { user_version: currentDbVersion } = db.getFirstSync<{ user_version: number }>(
      'PRAGMA user_version'
    );
    if (currentDbVersion >= DATABASE_VERSION) {
      return;
    }
    if (currentDbVersion === 0) {
      db.execSync(`
        PRAGMA journal_mode = 'wal';
        CREATE TABLE Drug (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, qtd INTEGER, boxQtd INTEGER NOT NULL, time TEXT, config TEXT);
      `);
    }
    db.execSync(`PRAGMA user_version = ${DATABASE_VERSION}`);
  }
}



