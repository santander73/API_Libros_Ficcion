import express from 'express';
import morgan from 'morgan';
import librosRoutes from './routes/libros.routes.js';


const app = express();
app.use(morgan('combined'));
// Middleware para procesar JSON
app.use(express.json());

// Le decimos a la app que todas las rutas de "librosRoutes" empezarán con /api/libros
app.use('/api/libros', librosRoutes);

export default app;