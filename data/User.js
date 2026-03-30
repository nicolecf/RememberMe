import * as SQLite from "expo-sqlite";

export default async function User() {

  const db = await SQLite.openDatabaseAsync('RememberMe');

  initialize = async () => {
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS User (id INTEGER PRIMARY KEY NOT NULL, value TEXT NOT NULL, intValue INTEGER);
      INSERT INTO User (value, intValue) VALUES ('User1', 123);
      INSERT INTO User (value, intValue) VALUES ('User2', 456);
      INSERT INTO User (value, intValue) VALUES ('User3', 789);
      `);
  }

  newUser = async (name, value) => {
    // `runAsync()` is useful when you want to execute some write operations.
    const result = await db.runAsync('INSERT INTO User (value, intValue) VALUES (?, ?)', name, value);
    console.log(result.lastInsertRowId, result.changes);
    // await db.runAsync('UPDATE User SET intValue = ? WHERE value = ?', 999, 'aaa'); // Binding unnamed parameters from variadic arguments
    // await db.runAsync('UPDATE User SET intValue = ? WHERE value = ?', [999, 'aaa']); // Binding unnamed parameters from array
    // await db.runAsync('DELETE FROM User WHERE value = $value', { $value: 'aaa' }); // Binding named parameters from object
  }

  lastUser = async () => {
    // `getFirstAsync()` is useful when you want to get a single row from the database.
    const firstRow = await db.getFirstAsync('SELECT * FROM User');
    console.log(firstRow.id, firstRow.value, firstRow.intValue);
  }

  allUsers = async () => {
    // `getAllAsync()` is useful when you want to get all results as an array of objects.
    const allRows = await db.getAllAsync('SELECT * FROM User');
    for (const row of allRows) {
      console.log(row.id, row.value, row.intValue);
    }
  }

  // // `getEachAsync()` is useful when you want to iterate SQLite query cursor.
  // for await (const row of db.getEachAsync('SELECT * FROM User')) {
  //   console.log(row.id, row.value, row.intValue);
  // }
}