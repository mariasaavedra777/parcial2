/**
 * Universidad - Facultad de Ingeniería
 * Asignatura: Introducción a la Computación Gráfica
 * * Estudiante: Maria Fernanda Saavedra Amortegui
 * * Tarea: Implementar los algoritmos de rasterización manual.
 */

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
// Función de apoyo para dibujar un píxel individual
function drawPixel(ctx, x, y, color = "#000000") {
    ctx.fillStyle = color;
    ctx.fillRect(Math.floor(x), Math.floor(y), 1, 1);
}
/**
 * Implementación del algoritmo de Bresenham para líneas.
 * Soporta todos los octantes mediante el cálculo de incrementos (sx, sy)
 * y el parámetro de decisión p para ajuste de error.
 */
function bresenhamLine(x0, y0, x1, y1, color) {
    let dx = Math.abs(x1 - x0);
    let dy = Math.abs(y1 - y0);
    let sx = (x0 < x1) ? 1 : -1;
    let sy = (y0 < y1) ? 1 : -1;
    let err = dx - dy; // Parámetro inicial

    while (true) {
        drawPixel(ctx, x0, y0, color);

        if (x0 === x1 && y0 === y1) break;

        // Cálculo del parámetro de decisión p (e2)
        // Se documenta el ajuste: si e2 > -dy, ajustamos en X. Si e2 < dx, ajustamos en Y.
        // Esto permite manejar pendientes m > 1 y m < 0 correctamente.
        let e2 = 2 * err;
        if (e2 > -dy) {
            err -= dy;
            x0 += sx;
        }
        if (e2 < dx) {
            err += dx;
            y0 += sy;
        }
    }
}