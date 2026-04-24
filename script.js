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