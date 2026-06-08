// middlewares/validarLibro.js

export const validarCamposLibro = (req, res, next) => {
    const { titulo, autor, anio, subgenero, paginas } = req.body;

    // Evaluamos que existan los 5 campos obligatorios exigidos por la rúbrica
    if (!titulo || !autor || !anio || !subgenero || !paginas) {
        console.log("❌ [Middleware] Intento de petición rechazado: Campos incompletos.");
        return res.status(400).json({
            mensaje: "Error de validación: Los campos (titulo, autor, anio, subgenero, paginas) son obligatorios."
        });
    }

    // Si todo está correcto, ejecutamos next() para dar luz verde a la ruta
    console.log("✅ [Middleware] Validación exitosa. Dando paso al controlador.");
    next();
};