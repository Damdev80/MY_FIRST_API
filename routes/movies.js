import { Router } from "express"; //Importamos Router para tener nuestras rutas en una carptea aparte y poder hacer nuestro proyecto mas escalable
import { MoviesController } from "../controllers/movies.js";


export const createMovieRouter = ({movieModel}) => {

    const moviesRouter = Router() //Le ponemos el nombre a la funcion router para todas nuestras ruta
    const moviesController = new MoviesController({ movieModel })
    
    moviesRouter.get("/", moviesController.getAll);
    moviesRouter.post('/', moviesController.create)
    moviesRouter.get('/:id', moviesController.getById)
    moviesRouter.delete("/:id", moviesController.delete);
    moviesRouter.patch("/:id", moviesController.updateMovie);

    return moviesRouter 
}
