// const http= require('http')
// const { response } = require('express')

const config= require('./config')
const express = require('express')
const app = express()
let rest
app.use(express.json())
app.use(express.urlencoded({extended:false}))
/* conexion servidor*/
/*const rest = new(require('rest-mssql-nodejs'))({
  user:'sa',
  password:'2021.adminekis',
  server:'181.211.62.199',
  database:'codepartes',
  port:1435,
  options:{
    encrypt:true
  }
})*/

/*let result =[]
setTimeout( async()=>{
  result= await rest.executeStoredProcedure('tb_clear')
  console.log(result.data)
}, 1500)*/

const notas = [
  {
    id: 1,
    contenido: 'Atender Multilimpio',
    date: '01/04/2021 09:00',
    importante: true
  },
  {
    id: 2,
    contenido: 'Atender Codepartes',
    date: '01/04/2021 10:30',
    importante: false
  }
]

/** const app= http.createServer((request,response)=>{
    response.writeHead(200,{'Content-Type':'application/json'});
    response.end(JSON.stringify(notas));
});**/
/*orto comentario */

app.get('/', (req, resp) => {
  resp.send('<h1>Hello World</>')
})
app.get('/notas', (req, resp) => {
  
  resp.json(result.data)
})
app.get('/notas/:id', (req, resp) => {
  const id = Number(req.params.id)
  const nota = notas.find(notas => notas.id == id)
  if (nota) {
    resp.json(nota)
  } else {
    resp.status(404).end()
    };
})

/* GET CONEXION */
app.post('/conectar',(req,res) => {
  
    rest = new(require('rest-mssql-nodejs'))({
    user:req.body.user,
    password:req.body.password,
    server:req.body.server,
    database:req.body.database,
    port:req.body.port,
    options:{
      encrypt:true
    }
  })
  module.exports = {
    rest
  }
  res.status(201).send(`conetado a la base${req.body.database}`)
})

app.get('/dbname',(req,res)=>{
  let result =[]
  let razon 
  setTimeout( async()=>{
    result= await rest.executeQuery('select * from conta_empresa')
    console.log(result)
  }, 1500)
  if(rest){
    res.json(result)
    res.status(201).send(`conetado a la base${result}`)
  }else
  {
    res.status(404).send(`no conectado db`)
  }
  
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
