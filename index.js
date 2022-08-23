/* CREATE DATABASE likeme;

Se ha modificado la tabla, para poder trabajar con id
CREATE TABLE posts (id SERIAL PRIMARY KEY,usuario varchar ( 25 ), url varchar ( 1000 ), descripcion
varchar ( 255 ), likes INT ); */


const express = require('express');
const db = require('./bd');
const fs = require("fs");
const app = express();

// middlwares
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.post("/post", async (req, res) => {
    console.log(req.body)
    try {

        const respuesta = await db.agregarPost(req.body);
        res.send(respuesta).status(201);
    } catch (error) {
        res.status(500).send(error)
    }
})

app.get("/posts", async (req, res) => {
    try {
        const resultado = await db.getPosts();
        res.end(JSON.stringify(resultado))
    } catch (error) {
        res.status(500).send(error)
    }
})

app.put("/post", async (req, res) => {
    
    try {
        const respuesta = await db.agregarLike(JSON.parse(req.query));
        res.send(respuesta);
    } catch (error) {
        res.send(error).status(500);
    }
})


app.listen(3000, () => {
    console.log("Server on http://localhost:3000");
});