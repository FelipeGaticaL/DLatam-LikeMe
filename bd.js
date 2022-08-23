const { Pool } = require('pg')

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "1234",
    database: "likeme",
    port: 5432
})

/* Agregamos likes con valor 0 por default, para poder hacer un + 1, en likes */
const agregarPost = async ({ usuario, URL, descripcion }) => {
    const SQLQuery = {
        text: `INSERT INTO posts (usuario, URL,descripcion,likes) values ($1, $2,$3,0) RETURNING *;`,
        values: [usuario, URL, descripcion]
    };
    const result = await pool.query(SQLQuery);
    return result.rows[0];
}

const getPosts = async () => {
    const { rows } = await pool.query("SELECT * FROM posts")
    return rows
}

const agregarLike = async ( {id} ) => {
    const consulta = {
        text: `UPDATE posts SET likes = likes+1 WHERE id =$1 RETURNING* `,
        values: [id]
    }
    console.log(await pool.query(consulta)) 
    console.log(rows)
    
    return rows
}


module.exports = { agregarPost,getPosts,agregarLike}