import express, { json } from "express"; // Importamos Express
import { moviesRouter } from "./routes/movies.js";
import { corsMiddleware } from './middleware/cors.js';
//coreccion de esquema
const app = express();
// Permite leer JSON desde el body de las peticiones
app.use(json());
// Middleware de CORS con lista de dominios permitidos
app.use(corsMiddleware());
// Desactiva el header 'X-Powered-By: Express'
app.disable("x-powered-by");

app.use("/movies", moviesRouter); //Aca indicamos que todos las rutas empiezan por movies
// Puerto en el que correrá el servidor
const PORT = process.env.PORT ?? 1234;

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`);
});
