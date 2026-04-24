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
/**
 * Implementación del algoritmo de Punto Medio para circunferencias.
 * Utiliza simetría de octantes para eficiencia.
 */
function bresenhamCircle(xc, yc, r, color) {
    let x = 0;
    let y = r;
    let p = 1 - r; // Parámetro de decisión inicial

    const drawOctants = (x, y) => {
        drawPixel(ctx, xc + x, yc + y, color); drawPixel(ctx, xc - x, yc + y, color);
        drawPixel(ctx, xc + x, yc - y, color); drawPixel(ctx, xc - x, yc - y, color);
        drawPixel(ctx, xc + y, yc + x, color); drawPixel(ctx, xc - y, yc + x, color);
        drawPixel(ctx, xc + y, yc - x, color); drawPixel(ctx, xc - y, yc - x, color);
    };

    drawOctants(x, y);

    while (x < y) {
        x++;
        // Lógica de ajuste del parámetro de decisión según el algoritmo de punto medio
        if (p < 0) {
            p += 2 * x + 1;
        } else {
            y--;
            p += 2 * (x - y) + 1;
        }
        drawOctants(x, y);
    }
}
/**
 * Calcula los vértices de un polígono regular.
 * @param {number} centerX, centerY - Centro
 * @param {number} sides - Número de lados
 * @param {number} radius - Radio
 * @returns {Array} Arreglo de objetos {x, y}
 */
function getPolygonVertices(centerX, centerY, sides, radius) {
    let vertices = [];
    for (let i = 0; i < sides; i++) {
        // Cálculo trigonométrico usando ángulos en radianes
        let angle = (2 * Math.PI * i) / sides;
        let x = centerX + radius * Math.cos(angle);
        let y = centerY + radius * Math.sin(angle);
        vertices.push({ x, y });
    }
    return vertices;
}
/**
 * Función principal para generar la figura solicitada.
 * Genera n lados (5-10) y dibuja la figura compuesta.
 */
function drawComposition() {
    const centerX = 400;
    const centerY = 300;
    const R = 200; // Radio del polígono
    const n = Math.floor(Math.random() * (10 - 5 + 1)) + 5; // Número aleatorio entre 5 y 10

    const vertices = getPolygonVertices(centerX, centerY, n, R);

    // 1. Trazado del polígono
    for (let i = 0; i < vertices.length; i++) {
        let v1 = vertices[i];
        let v2 = vertices[(i + 1) % vertices.length];
        bresenhamLine(v1.x, v1.y, v2.x, v2.y, "#FF0000"); // Color rojo para el polígono
    }

    // 2. Trazado de circunferencias (R/4) en cada vértice
    const circleRadius = R / 4;
    vertices.forEach(v => {
        bresenhamCircle(v.x, v.y, circleRadius, "#0000FF"); // Color azul para los círculos
    });
}

// Ejecutar al cargar la página
window.onload = drawComposition;