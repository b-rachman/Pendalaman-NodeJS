import sqlite from 'sqlite3'

//export .initDatabase

export function initDatabase(){
    return new sqlite.Database('data', (err)=>{
        if (err){
            throw err
        }

        console.log('Init db success')
    })
}

/**
 * 
 * @param {sqlite.Database} db 
 */

export function initTable(db){
    db.serialize(()=>{
        db.run(`CREATE TABLE IF NOT EXISTS product  (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            photo TEXT NOT NULL,
            name VARCHAR(56) NOT NULL,
            price INTEGER NOT NULL
        );`)
    })

}