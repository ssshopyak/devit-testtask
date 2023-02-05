import * as SQLite from "expo-sqlite";
import { useState } from "react";
import Auth from "../store/auth";

const db = SQLite.openDatabase('DevIT.db')
const email = 'ostap.shopyak@gmail.com'

export const createTable = () => {
     db.transaction((tx)=>{
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS "
            + "Users "
            + "(ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Email TEXT, Phone TEXT, Password TEXT, Position TEXT, Skype TEXT);"
        )
    })
}

export const toRegister = (name,email,phone,password) => {
    db.transaction((tx)=>{
        tx.executeSql(
            "INSERT INTO Users (Name,Email,Phone,Password) VALUES (?,?,?,?)",
            [name,email,phone,password],
            error => { console.log(error)}
        )
    })
    Auth.ToSetEmail(email)
}

export const toGetData = new Promise((resolve, reject) => {
    db.transaction((tx)=>{
        tx.executeSql(
            "SELECT * FROM Users", null,
            (tx,results) => {
                resolve(results.rows._array)
            },
            (tx,error) => {
                reject(error)
            }
        )
    })
})

export const ToGetDataByEmail = new Promise((resolve,reject) => {
    db.transaction((tx)=>{
        tx.executeSql(
            `SELECT * FROM Users WHERE Email = "${email}"`, null,
            (tx,results) => {
                resolve(results.rows._array)
                console.log(results.rows._array)
            },
            (tx,error) => {
                reject(error)
            }
        )
    })
})

export const UpdateData = (name,email,phone,position,skype) => {
    db.transaction((tx)=>{
        tx.executeSql(
            `UPDATE Users SET Name = ${name},Email = ${email},Phone = ${phone},Position = ${position}, Skype = ${skype} WHERE Email = ${email} `,
            error => { console.log(error)}
        )
    })
}