import { Router } from "express"; //Importamos Router para tener nuestras rutas en una carptea aparte y poder hacer nuestro proyecto mas escalable
import { MoviesController } from "../controllers/movies.js";


export const moviesRouter = Router() //Le ponemos el nombre a la funcion router para todas nuestras rutas

moviesRouter.get("/", MoviesController.getAll);

moviesRouter.get('/:id', MoviesController.getById)

moviesRouter.post('/', MoviesController.create)

moviesRouter.delete("/:id", MoviesController.delete);
  
moviesRouter.patch("/:id", MoviesController.updateMovie);