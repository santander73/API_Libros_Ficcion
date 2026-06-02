import fs from 'fs';

// Actualizamos la ruta para que apunte a la carpeta data
const rutaArchivo = './data/libros.json';

export const leerDatos = () => {
    const data = fs.readFileSync(rutaArchivo, 'utf-8');
    return JSON.parse(data);
};

export const guardarDatos = (datos) => {
    fs.writeFileSync(rutaArchivo, JSON.stringify(datos, null, 2));
};

// Exportamos las funciones para poder usarlas en las rutas
export default {
    leerDatos,
    guardarDatos
};