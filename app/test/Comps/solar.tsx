"use client";

import { Button } from "@/TODO/components/ui/button";
import { useState, useRef, useEffect } from "react";

interface SolarSystemProps {
  onDateSelect?: (date: { day: number; month: string; year: number }) => void;
}

const SolarSytem = ({ onDateSelect }: SolarSystemProps) => {
  const [earthAngle, setEarthAngle] = useState(-Math.PI / 2);
  const [isDragging, setIsDragging] = useState(false);
  const [day, setDay] = useState(1);
  const [month, setMonth] = useState("January");
  const [year, setYear] = useState(2024);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastAngleRef = useRef(-Math.PI / 2);
  const rotationsRef = useRef(0);

  const orbitRadius = 150;
  const orbitCenterX = 250;
  const orbitCenterY = 250;

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - orbitCenterX;
        const y = e.clientY - rect.top - orbitCenterY;
        const newAngle = Math.atan2(y, x);
        setEarthAngle(newAngle);
        updateDate(newAngle);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  const updateDate = (newAngle: number) => {
    const oldAngle = lastAngleRef.current;
    let angleDiff = newAngle - oldAngle;

    if (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
    if (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;

    let adjustedAngle = newAngle + Math.PI / 2;
    if (adjustedAngle < 0) adjustedAngle += 2 * Math.PI;
    let newDay = Math.floor((adjustedAngle / (2 * Math.PI)) * 365) + 1;

    rotationsRef.current += angleDiff / (2 * Math.PI);

    if (rotationsRef.current >= 1) {
      setYear((prev) => prev + 1);
      rotationsRef.current = 0;
    } else if (rotationsRef.current <= -1) {
      setYear((prev) => prev - 1);
      rotationsRef.current = 0;
    }

    lastAngleRef.current = newAngle;

    const newMonthIndex = Math.floor((newDay - 1) / 30.44);

    setDay(newDay);
    setMonth(monthNames[newMonthIndex]);
  };

  const handleConfirm = () => {
    if (onDateSelect) {
      onDateSelect({ day, month, year });
    }

    console.log(day, month, year);
  };

  const earthX = orbitCenterX + orbitRadius * Math.cos(earthAngle);
  const earthY = orbitCenterY + orbitRadius * Math.sin(earthAngle);

  return (
    <div
      ref={containerRef}
      className="relative w-[500px] h-[500px] bg-gray-900 overflow-hidden rounded-2xl"
    >
      <div className="absolute top-1/2 left-1/2 w-20 h-20 bg-yellow-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-yellow-500/50"></div>
      <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
      <div
        className="absolute top-0 left-1/2 w-2 h-2 rounded-full transform -translate-x-1/2 -translate-y-1/2"
        style={{ top: orbitCenterY - orbitRadius }}
      ></div>
      <div
        className={`absolute w-8 h-8 bg-blue-500 rounded-full shadow-md cursor-grab ${isDragging ? "cursor-grabbing" : ""}`}
        style={{
          left: `${earthX}px`,
          top: `${earthY}px`,
          transform: "translate(-50%, -50%)",
        }}
        onMouseDown={() => setIsDragging(true)}
      >
        <div className="absolute inset-0 bg-blue-200 rounded-full opacity-30"></div>
        <div className="absolute inset-1 bg-green-500 rounded-full opacity-50"></div>
      </div>
      <div className="absolute bottom-4 left-4 right-4 text-white bg-gray-800 bg-opacity-75 p-4 rounded flex justify-between items-center">
        <div>
          <p>Day: {day}</p>
          <p>Month: {month}</p>
          <p>Year: {year}</p>
        </div>
        <Button onClick={handleConfirm} className="ml-4">Confirm</Button>
      </div>
    </div>
  );
};

export default SolarSytem;
