const express = require("express")
const server = express()

// pegar o banco de dados
const db = require("./database/db.js")

//configurar pasta publica
server.use(express.static("public"))

//habilitar o uso do qer.body
server.use(express.urlencoded({ extended: true }))


//utilizando template engine
const nunjucks = require("nunjucks")
const { query } = require("express")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

//configurar caminhos da minha aplicação
//req = requisição, res = resposta
server.get("/", (req,res) => {
    return res.render("index.html", { title: "Um título"})
})

server.get("/create-point", (req,res) => {
    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {

    // inserir dados no banco

    const query = `
         INSERT INTO places (
             name, 
             image, 
             address, 
             address2, 
             state, 
             city, 
             items
         ) VALUES (?, ?, ?, ?, ?, ?, ?);        
     `

    const values = [
        req.body.name,
        req.body.image,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]


    function afterInsertData(err) {
        if(err) {
            console.log(err)
            return res.render("create-point.html", { notsaved: true } )
        }

        console.log("Cadastrado com sucesso")
        console.log(this)
        return res.render("create-point.html", { saved: true } )
    }

    db.run(query, values, afterInsertData)
   
})


server.get("/search", (req,res) => {

    const search = req.query.search
    // pegar os dados do banco
    if(search == ""){
        
        db.all(`SELECT * FROM places`, function(err, rows){
            if(err) {
                return console.log(err)
            }
            const total = rows.length
            //mostrar a pag html com os dados do banco
            return res.render("search-results.html", { places: rows , total: total})
        })
    } else {
        db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){
            if(err) {
                return console.log(err)
            }
            const total = rows.length
            //mostrar a pag html com os dados do banco
            return res.render("search-results.html", { places: rows , total: total})
        })
    }

})

//ligar o servidor
server.listen(3000)