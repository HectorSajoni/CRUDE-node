const express = require('express')
const mysql = require('mysql2')
const bodyParser = require('body-parser')
const { empty } = require('statuses')
var app = express()

const PORT = process.env.PORT || 3000

const DB_HOST = process.env.DB_HOST || 'localhost'
const DB_USER = process.env.DB_USER || 'root'
const DB_PASSWORD = process.env.DB_PASSWORD || 'n0m3l0'
const DB_NAME = process.env.DB_NAME || 'biblio'
const DB_PORT = process.env.DB_PORT || 3306

var con = mysql.createConnection(
    {
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME,
        port: DB_PORT
    })

app.use(express.static('public'))
con.connect()
app.use(bodyParser.json())

app.use(bodyParser.urlencoded(
    {
        extended:true
    }
))

app.listen(PORT,()=>
{
    console.log("Servidor escuchando en el puerto ", PORT)
})

app.post('/mostrarLibros', (req,res)=>{
    con.query('select * from libro', (err,respuesta,field)=>{
        
        if(err){
            console.log('error:', err)
            return res.send("/error.html")
        } 
        
        var libroHTML=``
        respuesta.forEach(libro=>{

            if(libro.genero==null) genero = "Sin datos"
            else genero = libro.genero

            if(libro.anno==null) anno = "Sin datos"
            else anno = libro.anno
            
            if(libro.autor==null) autor = "Sin datos"
            else autor = libro.autor

            if(libro.pais==null) pais = "Sin datos"
            else pais = libro.pais

            libroHTML+=
            `<tr><td>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
            ${libro.idlibro}</td><td>${libro.libro}</td><td>${genero}</td>
            <td>${autor}</td><td>${pais}</td><td>${anno}</td>
            </tr>`
        })
        return res.send
        (`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="style.css">
            <title>Crude libros</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
        </head>
        <body class="estrecho">
            <h1 class="centrar">Mi colección de libros</h1><br>
            <table class="table table-dark table-hover">
                <tr>
                    <th>Número</th>
                    <th>Título</th>
                    <th>Género</th>
                    <th>Autor</th>
                    <th>País</th>
                    <th>Año</th>
                </tr>
                ${libroHTML}
            </table>
            <br>
            <a href="index.html"><button class="btn btn-warning">Volver</button></a>
        </body>
        </html>
        `)
    })
})

app.post('/agregarLibro',(req,res)=>
{
    let nombre = "\""+req.body.libro+"\""
    if(req.body.genero == ""){
        genero = ""
        generoCol = ""
    } 
    else{
        genero = ", \""+req.body.genero+"\""
        generoCol = ", genero"
    } 
    if(req.body.autor == ""){
        autor = ""
        autorCol = ""
    } 
    else{
        autor = ", \""+req.body.autor+"\""
        autorCol = ", autor"
    } 
    if(req.body.pais == ""){
        pais = ""
        paisCol = ""
    } 
    else{
        pais = ", \""+req.body.pais+"\""
        paisCol = ", pais"
    } 
    if(req.body.anno == ""){
        anno = ""
        annoCol = ""
    } 
    else{
        anno = ", "+req.body.anno
        annoCol = ", anno"
    } 

    con.query('insert into libro(libro'+generoCol+autorCol+paisCol+annoCol+') values('+nombre+genero+autor+pais+anno+')',(err,respuesta,fields)=>
    {
        if(err)return console.log("Error",err)

        return res.send(`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Agregado</title>
            <link rel="stylesheet" href="style.css">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
        </head>
        <body>
            <h1>El libro: `+nombre+` fue agregado a la colección</h1><br>
            <a href="index.html"><button class="btn btn-warning">Volver</button></a>
        </body>
        </html>`)
    })
})

app.post('/actualizarLibro',(req,res)=>
{
    id = req.body.idlibro2
    
    con.query('select * from libro where idlibro='+id,(err,respuesta,fields)=>
    {
        if(err)return console.log("Error",err)

        if(respuesta.length === 0) return res.send(`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Error</title>
            <link rel="stylesheet" href="style.css">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
        </head>
        <body>
            <h1>El libro que quieres actualizar no está registrado en la colección, porfavor verifica que hayas escrito bien el número</h1><br>
            <a href="index.html"><button class="btn btn-warning">Volver</button></a>
        </body>
        </html>`)

        respuesta.forEach(libro=>
        {
            
            nombre = "\""+libro.libro+"\""
            autor = "\""+libro.autor+"\""
            genero = "\""+libro.genero+"\""
            pais = "\""+libro.pais+"\""
            anno = libro.anno

            if(req.body.libro2 != "") nombre = "\""+req.body.libro2+"\""
            if(req.body.genero2 != "") genero = "\""+req.body.genero2+"\""
            if(req.body.autor2 != "") autor = "\""+req.body.autor2+"\""
            if(req.body.pais2 != "") pais = "\""+req.body.pais2+"\""
            if(req.body.anno2 != "") anno = req.body.anno2

            con.query('update libro set libro='+nombre+', genero='+genero+', autor='+autor+', pais='+pais+', anno='+anno+' where idlibro='+id,(err,respuesta,fields)=>
            {
                if(err)return console.log("Error",err)

                return res.send(`<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Actualizado</title>
                    <link rel="stylesheet" href="style.css">
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
                </head>
                <body>
                    <h1>El libro: `+nombre+` fue actualizado en la colección</h1><br>
                    <a href="index.html"><button class="btn btn-warning">Volver</button></a>
                </body>
                </html>`)
            })

        })
    })

})

app.post('/borrarLibro',(req,res)=>
{
    let id = req.body.idlibro3
    let nombre = ""

    con.query('select * from libro where idlibro='+id,(err,respuesta,fields)=>
    {
        if(err)return console.log("Error",err)

        if(respuesta.length === 0) return res.send(`<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Error</title>
                <link rel="stylesheet" href="style.css">
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
            </head>
            <body>
                <h1>El libro que quieres borrar no está registrado en la colección, porfavor verifica que hayas escrito bien el número</h1><br>
                <a href="index.html"><button class="btn btn-warning">Volver</button></a>
            </body>
            </html>`)

        nombre = respuesta[0].libro

        con.query('delete from libro where idlibro='+id,(err,respuesta,fields)=>
        {
            if(err) return console.log('error:', err)

            if(err){
                return res.send(`<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Error</title>
                    <link rel="stylesheet" href="style.css">
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
                </head>
                <body>
                    <h1>Upssss, parece que tuviste un dato mal en el formulario, tendrás que volver a escribirlo ¡Ten más cuidado!</h1><br>
                    <a href="index.html"><button class="btn btn-warning">Volver</button></a>
                </body>
                </html>`)
            }

            return res.send(`<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Agregado</title>
                <link rel="stylesheet" href="style.css">
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
            </head>
            <body>
                <h1>El libro: "`+nombre+`" fue borrado de la colección</h1><br>
                <a href="index.html"><button class="btn btn-warning">Volver</button></a>
            </body>
            </html>`)
        })
    })
})