import * as SQLite from 'expo-sqlite'
import Auth from '../store/auth'

const db = SQLite.openDatabase('DevIT.db')

export const createTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS ' +
        'Users ' +
        '(ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Email TEXT, Phone TEXT, Password TEXT, Position TEXT, Skype TEXT);',
    )
  })
}

export const toRegister = (name, email, phone, password) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO Users (Name,Email,Phone,Password) VALUES (?,?,?,?)',
      [name, email, phone, password],
      error => {
        console.log(error)
      },
    )
  })
  Auth.ToSetEmail(email)
}

export const toGetData = new Promise((resolve, reject) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM Users',
      null,
      (tx, results) => {
        resolve(results.rows._array)
      },
      (tx, error) => {
        reject(error)
      },
    )
  })
})

export const toGetDataByEmail = email => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM Users WHERE Email = "${email}"`,
        null,
        (tx, results) => {
          resolve(results.rows._array)
          console.log(results.rows._array + 'index')
        },
        (tx, error) => {
          reject(error)
        },
      )
    })
  })
}

export const updateData = (name, email, phone, position, skype) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE Users SET Name = ? , Phone = ? , Position = ? , Skype = ? WHERE Email = ? ',
        [name, phone, position, skype, email],
        results => {
          console.log(results)
        },
        error => {
          console.log(error)
        },
      )
    })
  })
}
