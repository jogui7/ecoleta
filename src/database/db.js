// importar a dependência do sqlite3
const sqlite3 = require("sqlite3").verbose()

// criar o objeto que irá fazer operacções no de banco de dados
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db
// utilizar o objeto de banco de dados para nossas operações
// db.serialize(() => {
//     // COMANDOS SQL:

//     // criar uma tabela
//     db.run(`
//         CREATE TABLE IF NOT EXISTS places (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             name TEXT,
//             image TEXT,
//             address TEXT,
//             address2 TEXT,
//             state TEXT,
//             city TEXT,
//             items TEXT
//         );
//     `)

//     // inserir dados na tabela
//     const query = `
//         INSERT INTO places (
//             name, 
//             image, 
//             address, 
//             address2, 
//             state, 
//             city, 
//             items
//         ) VALUES (?, ?, ?, ?, ?, ?, ?);        
//     `
//     const values = [
//         "Papersider", 
//         "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1401&q=80", 
//         "Guilherme Gemballa, Jardim América",
//         "Número 260",
//         "Rio do Sul",
//         "Santa catarina",
//         "Papéis e papelão"
//     ]

//     function afterInsertData(err) {
//         if(err) {
//             return console.log(err)
//         }

//         console.log("Cadastrado com sucesso")
//         console.log(this)
//     }

//     db.run(query, values, afterInsertData)

//     // consultar dados
//     db.all(`SELECT * FROM places`, function(err, rows){
//         if(err) {
//             return console.log(err)
//         }

//         console.log("Aqui estão os seus registros")
//         console.log(rows)
//     })

    // // deletar dados
//     db.run(`DELETE FROM places WHERE id = ?`, [3], function(err, rows){
//        if(err) {
//            return console.log(err)
//        }

//        console.log("Registro Deletado com sucesso!")
//        console.log(rows)
//     })
// })