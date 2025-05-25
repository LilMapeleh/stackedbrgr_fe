import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './test.css';

export default function PlayPage() {
  const canvasRef = useRef(null);
  const [gameOver, setGameOver] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    resizeCanvas();

    let baseGravity = 0.3;
    let baseBounce = -0.7;
    let difficultyTimer = 0;

    let burger = {
      x: canvas.width / 2,
      y: 100,
      radius: 25,
      vx: 2,
      vy: 2,
      gravity: baseGravity,
      bounce: baseBounce,
      recentlyPaddleHit: false,
    };

    let paddle = {
      width: 120,
      height: 20,
      x: canvas.width / 2 - 60,
      y: canvas.height - 40,
    };

    let mouseX = paddle.x;
    let animationFrameId;
    let isGameOver = false;

    const movePaddle = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left - paddle.width / 2;
    };
    canvas.addEventListener('mousemove', movePaddle);

    const drawBurger = () => {
      ctx.font = "48px Arial";
      ctx.textAlign = "center";
      ctx.fillText("🍔", burger.x, burger.y);
    };

    const drawPaddle = () => {
      ctx.fillStyle = "#a93e22";
      ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    };

    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      paddle.x = mouseX;
      if (paddle.x < 0) paddle.x = 0;
      if (paddle.x + paddle.width > canvas.width) paddle.x = canvas.width - paddle.width;

      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      if (elapsed > 0 && elapsed % 15 === 0 && elapsed !== difficultyTimer) {
        difficultyTimer = elapsed;
        burger.gravity = Math.min(burger.gravity + 0.1, 2);
        burger.bounce = Math.max(burger.bounce - 0.2, -2.5);
      }

      burger.vy += burger.gravity;
      burger.x += burger.vx;
      burger.y += burger.vy;

      if (
        burger.y + burger.radius >= paddle.y &&
        burger.x >= paddle.x &&
        burger.x <= paddle.x + paddle.width &&
        burger.vy > 0
      ) {
        burger.vy = -Math.random() * 15 - 10;
        burger.vx = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 6 + 4);

        const maxSpeed = 20;
        burger.vx = Math.max(-maxSpeed, Math.min(maxSpeed, burger.vx));
        burger.vy = Math.max(-maxSpeed, Math.min(maxSpeed, burger.vy));

        burger.recentlyPaddleHit = true;
      }

      const wallMargin = 5;
      const topMargin = 5;

      // Always enforce wall collision (left and right)
      if (burger.x <= burger.radius + wallMargin) {
        burger.x = burger.radius + wallMargin;
        burger.vx *= -1;
      }
      if (burger.x >= canvas.width - burger.radius - wallMargin) {
        burger.x = canvas.width - burger.radius - wallMargin;
        burger.vx *= -1;
      }

      // Top wall collision
      if (burger.y <= burger.radius + topMargin) {
        burger.y = burger.radius + topMargin;
        burger.vy *= -1;
      }

      // Optional: speed boost only after paddle hit
      if (burger.recentlyPaddleHit) {
        burger.vx *= 1.0;
        burger.vy *= 1.0;

        setTimeout(() => {
          burger.recentlyPaddleHit = false;
        }, 200);
      }

      drawBurger();
      drawPaddle();

      if (burger.y > canvas.height && !isGameOver) {
        isGameOver = true;
        setEndTime(Date.now());
        setGameOver(true);
        cancelAnimationFrame(animationFrameId);
      } else if (!isGameOver) {
        animationFrameId = requestAnimationFrame(update);
      }
    };

    setStartTime(Date.now());
    update();

    const handleResize = () => {
      resizeCanvas();
      paddle.y = canvas.height - 40;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousemove', movePaddle);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getTimeElapsed = () => {
    if (!startTime) return "0:00";
    const ms = (endTime ? endTime : Date.now()) - startTime;
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  return (
    <div className="game-container">
      <h1 className="game-title">🍔 Burger Bounce</h1>
      <p className="game-timer">Time: {getTimeElapsed()}</p>

      <div className="canvas-wrapper">
        <div className="canvas-container">
          <canvas ref={canvasRef} />
        </div>
      </div>

      {gameOver && (
        <div className="game-over-modal">
          <div className="modal-content">
            <h2 className="modal-title">Game Over! 🍔</h2>
            <div className="time-display">
              <p>You kept the burger up for {getTimeElapsed()}!</p>
            </div>
            <div className="modal-buttons">
              <Link to="/play" className="modal-button play-again">
                Play Again
              </Link>
              <Link to="/" className="modal-button back-home">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
