import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import app from './app.js';
import { leerDatos } from './services/libros.service.js';

// Capturamos los argumentos que se pasen por la consola
const argumentos = hideBin(process.argv);

// INTELIGENCIA: Si no se pasaron comandos adicionales, iniciamos el Servidor Web
if (argumentos.length === 0) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Servidor modular de la Biblioteca Sci-Fi corriendo en http://localhost:${PORT}`);
    });
} else {
    // Si el usuario sí escribió algo en la terminal, ejecutamos Yargs
    yargs(argumentos)
        .command({
            command: 'listar',
            describe: 'Muestra todos los libros de ciencia ficción en una tabla',
            handler() {
                try {
                    const libros = leerDatos();
                    console.log('\n--- BIBLIOTECA DE CIENCIA FICCIÓN (CLI) ---');
                    console.table(libros);
                } catch (error) {
                    console.error('Error al leer los datos:', error.message);
                }
            }
        })
        .command({
            command: 'buscar',
            describe: 'Busca un libro por su ID',
            builder: {
                id: {
                    describe: 'ID del libro',
                    demandOption: true,
                    type: 'number'
                }
            },
            handler(argv) {
                try {
                    const libros = leerDatos();
                    const libro = libros.find(l => l.id === argv.id);

                    if (libro) {
                        console.log('\n¡Libro encontrado!:');
                        console.log(`📖 Título: ${libro.titulo}\n✍️ Autor: ${libro.autor}`);
                    } else {
                        console.log(`\n❌ No se encontró ningún libro con el ID: ${argv.id}`);
                    }
                } catch (error) {
                    console.error('Error:', error.message);
                }
            }
        })
        .demandCommand(1, 'Uso: Usa un comando válido (listar/buscar) o inicia el servidor sin argumentos.')
        .help()
        .parse();
}