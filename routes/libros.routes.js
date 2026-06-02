import express from 'express';
const router = express.Router();
// Importamos la lógica desde nuestro servicio
import { leerDatos, guardarDatos } from '../services/libros.service.js';


// 1. GET: Obtener todos (limitado a 10)
router.get('/', (req, res) => {
    try {
        const libros = leerDatos();
        const primerosDiez = libros.slice(0, 10);
        res.status(200).json(primerosDiez);
    } catch (error) {
        console.log("Error al obtener los libros:", error);
        res.status(500).json({ mensaje: "Error interno del servidor" });
    }
});

// 2. GET: Obtener por ID
router.get('/:id', (req, res) => {
    try {
        const libros = leerDatos();
        const idParam = parseInt(req.params.id);
        const libro = libros.find(l => l.id === idParam);

        if (libro) {
            res.status(200).json(libro);
        } else {
            res.status(404).json({ mensaje: "Libro no encontrado" });
        }
    } catch (error) {
        console.log("Error al buscar el libro:", error);
        res.status(500).json({ mensaje: "Error interno del servidor" });
    }
});

// 3. POST: Agregar nuevo
router.post('/', (req, res) => {
    try {
        const libros = leerDatos();
        const nuevoLibro = req.body;
        nuevoLibro.id = libros.length > 0 ? libros[libros.length - 1].id + 1 : 1;

        libros.push(nuevoLibro);
        guardarDatos(libros);
        res.status(201).json({ mensaje: "Libro agregado con éxito", libro: nuevoLibro });
    } catch (error) {
        console.log("Error al agregar el libro:", error);
        res.status(500).json({ mensaje: "Error al procesar la solicitud" });
    }
});

// 4. PUT: Modificar existente
router.put('/:id', (req, res) => {
    try {
        const libros = leerDatos();
        const idParam = parseInt(req.params.id);
        const indice = libros.findIndex(l => l.id === idParam);

        if (indice !== -1) {
            libros[indice] = { ...libros[indice], ...req.body, id: idParam };
            guardarDatos(libros);
            res.status(200).json({ mensaje: "Libro actualizado", libro: libros[indice] });
        } else {
            res.status(404).json({ mensaje: "Libro a modificar no encontrado" });
        }
    } catch (error) {
        console.log("Error al modificar el libro:", error);
        res.status(500).json({ mensaje: "Error interno del servidor" });
    }
});

// 5. DELETE: Eliminar
router.delete('/:id', (req, res) => {
    try {
        let libros = leerDatos();
        const idParam = parseInt(req.params.id);
        const librosFiltrados = libros.filter(l => l.id !== idParam);

        if (libros.length !== librosFiltrados.length) {
            guardarDatos(librosFiltrados);
            res.status(200).json({ mensaje: "Libro eliminado correctamente" });
        } else {
            res.status(404).json({ mensaje: "Libro a eliminar no encontrado" });
        }
    } catch (error) {
        console.log("Error al eliminar el libro:", error);
        res.status(500).json({ mensaje: "Error interno del servidor" });
    }
});

export default router;