import * as SQLite from 'expo-sqlite';

export class Drug {
  name: string;
  qtd: number;
  boxQtd: number;
  id: number;
  time: string;
  config: string;

  db: SQLite.SQLiteDatabase;

  constructor(name = '', qtd = 0) {
    this.migrateDbIfNeeded(SQLite.openDatabaseSync('RememberMe'));
    this.db = SQLite.openDatabaseSync('RememberMe');
    this.name = name;
    this.qtd = qtd;

  }

  async saveDrug(name: string, qtd: number) {
    this.name = name;
    this.qtd = qtd;
    this.save();
  }

  async save() {
    const result = await this.db.runSync('INSERT INTO Drug (name, qtd) VALUES (?, ?)', this.name, this.qtd);
    console.log(result);

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



