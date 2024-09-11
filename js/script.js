function calculate() {
    const sideA = parseFloat(document.getElementById('sideA').value);
    const sideB = parseFloat(document.getElementById('sideB').value);
    const sideC = parseFloat(document.getElementById('sideC').value);

    if (isNaN(sideA) || isNaN(sideB) || isNaN(sideC) || sideA <= 0 || sideB <= 0 || sideC <= 0) {
        alert('Please enter valid positive numbers for all sides.');
        return;
    }

    // Perimeter
    const perimeter = sideA + sideB + sideC;
    document.getElementById('perimeterResult').textContent = `Perimeter: ${perimeter} cm`;

    // Area using Heron's formula
    const s = perimeter / 2;
    const area = Math.sqrt(s * (s - sideA) * (s - sideB) * (s - sideC));
    document.getElementById('areaResult').textContent = `Area: ${area.toFixed(2)} cm²`;

    // Draw accurate triangle
    drawAccurateTriangle(sideA, sideB, sideC);
}

function drawAccurateTriangle(a, b, c) {
    const canvas = document.getElementById('triangleCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const scale = 10;  // Scale down the triangle for better fitting on the canvas

    // Coordinates for point A (at origin)
    const Ax = 100;
    const Ay = 300;

    // Point B will be horizontal from A
    const Bx = Ax + b * scale;
    const By = Ay;

    // Using cosine rule to find angle between side a and side b
    const cosC = (a*a + b*b - c*c) / (2 * a * b);
    const angleC = Math.acos(cosC);

    // Calculate coordinates for point C using trigonometry
    const Cx = Ax + a * scale * Math.cos(angleC);
    const Cy = Ay - a * scale * Math.sin(angleC);

    // Draw the triangle
    ctx.beginPath();
    ctx.moveTo(Ax, Ay);  // Point A
    ctx.lineTo(Bx, By);  // Point B
    ctx.lineTo(Cx, Cy);  // Point C
    ctx.closePath();

    // Stroke and fill the triangle
    ctx.strokeStyle = "#004d40";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = "#80deea";
    ctx.fill();

    // Mark points A, B, and C
    ctx.fillStyle = "#000";
    ctx.font = "16px Roboto";
    ctx.fillText("A", Ax - 10, Ay + 20);
    ctx.fillText("B", Bx + 10, By + 20);
    ctx.fillText("C", Cx - 10, Cy - 10);
}
