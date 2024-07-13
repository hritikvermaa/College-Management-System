// database.ts
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
    {
        name: 'main.db',
        location: 'default',
    },
    () => { console.log("Database opened successfully") },
    error => { console.log("Error opening database: ", error) }
);

export const createTable = () => {
    db.transaction(tx => {
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                regNumber TEXT,
                designation TEXT,
                email TEXT,
                phone TEXT,
                password TEXT
            );`
        );
    });
};

export const insertUser = (name: string, regNumber: string, designation: string, email: string, phone: string, password: string) => {
    db.transaction(tx => {
        tx.executeSql(
            `INSERT INTO users (name, regNumber, designation, email, phone, password) VALUES (?, ?, ?, ?, ?, ?);`,
            [name, regNumber, designation, email, phone, password],
            (_, result) => { console.log("User inserted successfully: ", result) },
            (_, error) => { console.log("Error inserting user: ", error) }
        );
    });
};

export default db;
