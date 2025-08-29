import React, { useEffect, useRef } from 'react';

export default function CasaCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;

    ctx.clearRect(0, 0, W, H);

    let bgGradient = ctx.createLinearGradient(0, 0, 0, H);
    bgGradient.addColorStop(0, '#e0e5ec');
    bgGradient.addColorStop(1, '#f7f9fc');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, W, H);


    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.beginPath();
    ctx.ellipse(W/2, H*0.85, 110, 20, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.shadowColor = 'rgba(0, 0, 0, 0.15)';
    ctx.shadowBlur = 15;
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#b0bec5';
    ctx.lineWidth = 2;
    ctx.fillRect(W*0.25, H*0.45, W*0.5, H*0.35);
    ctx.strokeRect(W*0.25, H*0.45, W*0.5, H*0.35);

    ctx.fillStyle = '#607d8b'; 
    ctx.shadowBlur = 10;
    ctx.fillRect(W*0.2, H*0.4, W*0.6, 20);

    ctx.shadowBlur = 20;
    ctx.fillStyle = '#455a64';
    ctx.fillRect(W*0.48, H*0.7, W*0.08, H*0.1);

    ctx.shadowBlur = 0;
    ctx.strokeStyle = '#263238';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(W*0.48, H*0.7, W*0.08, H*0.1);

   
    ctx.fillStyle = '#00bcd4';
    ctx.fillRect(W*0.505, H*0.73, W*0.04, H*0.04);

    ctx.fillStyle = '#cfd8dc';
    ctx.shadowColor = 'rgba(0, 188, 212, 0.3)';
    ctx.shadowBlur = 15;
    ctx.fillRect(W*0.3, H*0.5, W*0.18, H*0.08);
    ctx.fillRect(W*0.52, H*0.5, W*0.18, H*0.08);

    ctx.shadowBlur = 0;
    ctx.strokeStyle = '#90a4ae';
    ctx.lineWidth = 1.2;
    ctx.strokeRect(W*0.3, H*0.5, W*0.18, H*0.08);
    ctx.strokeRect(W*0.52, H*0.5, W*0.18, H*0.08);

    ctx.beginPath();
    ctx.moveTo(W*0.3, H*0.54);
    ctx.lineTo(W*0.48, H*0.54);
    ctx.moveTo(W*0.39, H*0.5);
    ctx.lineTo(W*0.39, H*0.58);
    ctx.moveTo(W*0.52, H*0.54);
    ctx.lineTo(W*0.7, H*0.54);
    ctx.moveTo(W*0.61, H*0.5);
    ctx.lineTo(W*0.61, H*0.58);
    ctx.stroke();

  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={300}
      style={{
        borderRadius: '24px',
        boxShadow: '0 15px 35px rgba(0,0,0,0.12)',
        backgroundColor: '#f7f9fc',
        display: 'block',
        margin: '30px auto',
        maxWidth: '100%',
        height: 'auto',
      }}
    />
  );
}
