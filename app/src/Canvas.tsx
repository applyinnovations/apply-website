import React, { useCallback, useEffect, useRef, useState } from "react";

interface CanvasProps {
  width: number;
  height: number;
}

type Coordinate = {
  x: number;
  y: number;
};

function getCursorPosition(canvas: HTMLCanvasElement, event: MouseEvent) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  console.log("x: " + x + " y: " + y);
}

const COLORS = ["#6ac28c", "#394ca0", "#f59c60", "#e6483f", "#f38fb0"];

const Canvas = ({ width, height }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPainting, setIsPainting] = useState(false);
  const [colorIndex, setColorIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState<Coordinate | undefined>(
    undefined
  );

  const startPaint = useCallback((event: MouseEvent) => {
    const coordinates = getCoordinates(event);
    if (coordinates) {
      setMousePosition(coordinates);
      setIsPainting(true);
    }
  }, []);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.addEventListener("mousedown", startPaint);
    return () => {
      canvas.removeEventListener("mousedown", startPaint);
    };
  }, [startPaint]);

  const paint = useCallback(
    (event: MouseEvent) => {
      if (isPainting) {
        const newMousePosition = getCoordinates(event);
        if (mousePosition && newMousePosition) {
          drawLine(mousePosition, newMousePosition);
          setMousePosition(newMousePosition);
        }
      }
    },
    [isPainting, mousePosition]
  );

  useEffect(() => {
    const context = canvasRef.current?.getContext("2d");
    if (context) {
      context.strokeStyle = "#ffffff";
      context?.beginPath();
      // PRETTY BUT NOT IDEAL
      context.moveTo(129, 428);
      context.lineTo(153, 428); // x + 24
      context.lineTo(211, 580); // x + 58 | y + 152
      context.lineTo(185, 580); // x - 26
      context.lineTo(170, 541); // x - 15 | y - 39
      context.lineTo(111, 541); // x - 59
      context.lineTo(96, 580); // x - 15 | y + 39
      context.lineTo(70, 580); // x - 26
      context.lineTo(129, 428); // Move to begining point
      context?.stroke();
      context?.closePath();
      context.moveTo(140, 459);
      context.lineTo(162, 517);
      context.lineTo(119, 517);
      context.lineTo(140, 459);
      context?.stroke();
      context?.closePath();

      // EASY BUT NOT QUITE
      // context.lineWidth = 20;
      // context.moveTo(82, 580);
      // context.lineTo(140, 430);
      // context.lineTo(199, 580);
      // context.moveTo(110, 528);
      // context.lineTo(172, 528);
      // context?.stroke();
      // context?.closePath();

      // UGLY
      // context.moveTo(240, 250);
      // context.lineTo(280, 250);
      // context.lineTo(320, 350);
      // context.lineTo(280, 350);
      // context.lineTo(270, 320);
      // context.lineTo(250, 320);
      // context.lineTo(250, 320);
      // context.lineTo(240, 350);
      // context.lineTo(200, 350);
      // context.lineTo(240, 250);
      // context.lineTo(240, 250);
      // context?.stroke();
      // context?.closePath();
      // context.moveTo(260, 270);
      // context.lineTo(265, 300);
      // context.lineTo(255, 300);
      // context.lineTo(260, 270);
      // context?.stroke();
      // context?.closePath();
    }
  }, [canvasRef.current, colorIndex]);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.addEventListener("mousemove", paint);
    canvas.addEventListener("mousemove", (e) => {
      getCursorPosition(canvas, e);
    });
    return () => {
      canvas.removeEventListener("mousemove", paint);
      canvas.removeEventListener("mousemove", (e) => {
        getCursorPosition(canvas, e);
      });
    };
  }, [paint]);

  const exitPaint = useCallback(() => {
    setIsPainting(false);
    setMousePosition(undefined);

    setColorIndex((current) => {
      if (current === 4) {
        return 0;
      }

      return current + 1;
    });
  }, []);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.addEventListener("mouseup", exitPaint);
    canvas.addEventListener("mouseleave", exitPaint);
    return () => {
      canvas.removeEventListener("mouseup", exitPaint);
      canvas.removeEventListener("mouseleave", exitPaint);
    };
  }, [exitPaint]);

  const getCoordinates = (event: MouseEvent): Coordinate | undefined => {
    if (!canvasRef.current) {
      return;
    }

    const canvas: HTMLCanvasElement = canvasRef.current;
    return {
      x: event.pageX - canvas.offsetLeft,
      y: event.pageY - canvas.offsetTop,
    };
  };

  const drawLine = useCallback(
    (originalMousePosition: Coordinate, newMousePosition: Coordinate) => {
      if (!canvasRef.current) {
        return;
      }
      const canvas: HTMLCanvasElement = canvasRef.current;
      const context = canvas.getContext("2d");
      if (context) {
        context.strokeStyle = COLORS[colorIndex];
        context.lineJoin = "round";
        context.lineWidth = 200;

        context.beginPath();
        context.moveTo(originalMousePosition.x, originalMousePosition.y);
        context.lineTo(newMousePosition.x, newMousePosition.y);
        context.closePath();

        context.stroke();
      }
    },
    [colorIndex]
  );

  return <canvas ref={canvasRef} height={height} width={width} />;
};

export default Canvas;
