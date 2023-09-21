import React, { useState, useEffect, useRef } from "react";
import "./styles.css";

const BB8 = () => {
  const [state, setState] = useState({
    droidX: 0,
    mouseX: 0,
    toTheRight: true,
    speed: 1,
    accelMod: 0.5,
  });
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef(null);

  const handleMouseMove = (event) => {
    setState({
      ...state,
      mouseX: event.pageX - 225,
    });
  };

  const movement = () => {
    const { droidX, mouseX, speed, accelMod } = state;

    if (Math.abs(Math.round(droidX) - mouseX) !== 1) {
      const distance = mouseX - droidX;
      const acceleration = (Math.abs(distance * accelMod) / 100).toFixed(2);

      let newDroidX;

      if (droidX < mouseX) {
        newDroidX = parseFloat((droidX + speed * acceleration).toFixed(2));
      } else {
        newDroidX = parseFloat((droidX - speed * acceleration).toFixed(2));
      }

      if (newDroidX < droidX && newDroidX >= 0) {
        setState({
          ...state,
          droidX: Math.max(75, newDroidX),
          toTheRight: newDroidX > droidX,
        });
      }
      if (newDroidX >= 0 && newDroidX <= containerWidth) {
        setState({
          ...state,
          droidX: Math.max(75, newDroidX),
          toTheRight: newDroidX > droidX,
        });
      }
    }
  };

  useEffect(() => {
    setContainerWidth(containerRef.current.offsetWidth);
  }, [containerRef]);

  const handleResize = () => {
    setContainerWidth(containerRef.current.offsetWidth);
  };

  useEffect(() => {
    setState((oldState) => ({
      ...oldState,
      droidX: containerWidth / 2,
      mouseX: containerWidth / 2,
    }));

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const mouseMoveHandler = (e) => handleMouseMove(e);
    document.addEventListener("mousemove", mouseMoveHandler);

    const intervalId = setInterval(movement, 1);

    return () => {
      document.removeEventListener("mousemove", mouseMoveHandler);
      clearInterval(intervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const { mouseX, droidX, toTheRight } = state;

  return (
    <div
      ref={containerRef}
      style={{
        flex: 1,
        position: "relative",
      }}
    >
      <div
        className="bb8"
        style={{
          position: "absolute",
          left: `${droidX}px`,
        }}
      >
        <div
          className={"antennas " + (toTheRight ? "right" : "")}
          style={{
            WebkitTransform: `translateX(${(mouseX - droidX) / 25}px) rotateZ(${
              (mouseX - droidX) / 80
            }deg)`,
          }}
        >
          <div className="antenna short"></div>
          <div className="antenna long"></div>
        </div>
        <div
          className="head"
          style={{
            WebkitTransform: `translateX(${(mouseX - droidX) / 15}px) rotateZ(${
              (mouseX - droidX) / 25
            }deg)`,
          }}
        >
          <div className="stripe one"></div>
          <div className="stripe two"></div>
          <div className={"eyes " + (toTheRight ? "right" : "")}>
            <div className="eye one"></div>
            <div className="eye two"></div>
          </div>
          <div className={"stripe detail " + (toTheRight ? "right" : "")}>
            <div className="detail zero"></div>
            <div className="detail zero"></div>
            <div className="detail one"></div>
            <div className="detail two"></div>
            <div className="detail three"></div>
            <div className="detail four"></div>
            <div className="detail five"></div>
            <div className="detail five"></div>
          </div>
          <div className="stripe three"></div>
        </div>
        <div
          className="ball"
          style={{ WebkitTransform: `rotateZ(${droidX / 2}deg)` }}
        >
          <div className="lines one"></div>
          <div className="lines two"></div>
          <div className="ring one"></div>
          <div className="ring two"></div>
          <div className="ring three"></div>
        </div>
        <div className="shadow"></div>
      </div>
    </div>
  );
};

export default BB8;
