// components/CanvasBackground.js
import React, { useRef, useEffect } from 'react';

const CanvasBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Adjust these values to control the grid size
    const gridSpacing = 200; // Spacing between grid lines
    const gridLineWidth = 0.3; // Width of the grid lines
    const gridColor = '#dcd9d3'; // Color of the grid lines

    const drawGrid = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      context.strokeStyle = gridColor;
      context.lineWidth = gridLineWidth;

      for (let x = 0; x <= canvas.width; x += gridSpacing) {
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, canvas.height);
        context.stroke();
      }

      for (let y = 0; y <= canvas.height; y += gridSpacing) {
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(canvas.width, y);
        context.stroke();
      }
    };

    drawGrid();

    // Redraw grid on window resize
    window.addEventListener('resize', drawGrid);
    return () => window.removeEventListener('resize', drawGrid);
  }, []);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-[100vh] z-[-1]" />;
};

export default CanvasBackground;
