import mysql  from 'mysql2/promise'
import { randomUUID } from 'crypto'
import { uuidToBin } from '../../utils/id-cifrador.js' // creas esta función
const config = {
    host: 'gateway01.us-west-2.prod.aws.tidbcloud.com',
    user: '3dh5HSSCZkY5ga8.root',  // Tu usuario de TiDB
    password: 'ZVlWILggY7h4b9Va',  // Tu contraseña
    database: 'moviesdb',  // Base de datos en TiDB
    port: 4000,  // Puerto de TiDB
    ssl: {
        ca: 'C:/Users/danie/OneDrive/Documentos/Dev/Cursos/Node_cuso_midudev/Cuarta_Clase/ISRG_Root_X1.pem',  // Ruta al archivo CA (ISRG_Root_X1.pem)
        rejectUnauthorized: false  // Desactiva la validación del certificado (solo para pruebas)
    }
}
const connection = await mysql.createConnection(config)

export class MovieModel {

    static async getAll({genre}) {

        if(genre) {
            const lowerCaseGenre = genre.toLowerCase()

            const [result] = await connection.query(
                `SELECT id, name FROM genre WHERE LOWER(name) = ?;`,[lowerCaseGenre]
            )

            if (result.length === 0 ) return []

            // get the id from the fisrt genre result 
            const [{id}] = result
            //get all movies ids from database table
            const [movies] = await connection.query(`
                SELECT 
                    m.title,
                    m.year,
                    m.director,
                    m.duration,
                    m.poster,
                    m.rate,
                    BIN_TO_UUID(m.id) AS id
                FROM movie m
                JOIN movie_genres mg ON m.id = mg.movie_id
                WHERE mg.genre_id = ?
            `, [id])

            return movies[0]
        }
        
        const [movies] = await connection.query(
            'SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie;'
        )

        return movies
    }
    
    static async getById({id}) {
        const [movies] = await connection.query(
            `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie
            WHERE id = UUID_TO_BIN(?);`,[id]
        )

        if(movies.length === 0 ) return null

        return movies[0]
    }

    static async create({ input }) {
        const {
            genre: genreInput,
            title,
            year,
            duration,
            director,
            rate,
            poster
        } = input
    
        const uuid = randomUUID()           // genera UUID en string
        const binaryUUID = uuidToBin(uuid)  // convierte a BINARY(16)
    
        try {
            await connection.query(
                `INSERT INTO movie (id, title, year, director, duration, poster, rate)
                 VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [binaryUUID, title, year, director, duration, poster, rate]
            )
        } catch (e) {
            console.error(e)
            throw new Error("Error creating movie")
        }
    
        const [movies] = await connection.query(
            `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id
             FROM movie WHERE id = ?`,
            [binaryUUID]
        )
    
        return movies[0]
    }

    static async delete({id}){
        // Obetener el id 
        const [result] = await connection.query(
            `DELETE FROM movie WHERE id = UUID_TO_BIN(?)`,
            [id]
        )
        // borrar todos los campos de esa pelicula
        if (result.affectedRows === 0) {
            return false
        }
    
        return true
        //mostrar el resultado
    }

    static async update({id, input}){
        if (!id) {
            throw new Error('Se requiere un ID para actualizar la película.');
          }
        
          // Eliminar el campo "id" del input si está por accidente
          if ('id' in input) {
            delete input.id;
          }
        
          const fields = Object.keys(input);
          if (fields.length === 0) {
            throw new Error('No se proporcionaron campos para actualizar.');
          }
        
          const setClause = fields.map(field => `${field} = ?`).join(', ');
          const values = fields.map(field => input[field]);
        
          values.push(id); // para la cláusula WHERE
        
          const [result] = await connection.query(
            `UPDATE movie SET ${setClause} WHERE id = UUID_TO_BIN(?)`,
            values
          );
        
          if (result.affectedRows === 0) {
            return false
          }
        
          return console.log(`Pelicula ${result.keys}`)
    }
}