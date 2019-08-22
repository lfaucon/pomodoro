import React, { useState } from "react";
import "./App.css";

var INTERVAL;

const App = () => {
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState("00:00:00");
  const [startTime, setSartTime] = useState(undefined);
  const [completed, setCompleted] = useState(false);

  const stop = () => {
    setPlaying(false);
    if (INTERVAL) clearInterval(INTERVAL);
    setCurrentTime("00:00:00");
    setSartTime(undefined);
  };

  const play = target => {
    setPlaying(true);
    setCompleted(false);
    if (INTERVAL) clearInterval(INTERVAL);
    const start = startTime || new Date();
    setSartTime(start);
    INTERVAL = setInterval(() => update(start, target), 42);
  };

  const update = (start, target) => {
    const time = new Date() - start;
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor(time / 1000) % 60;
    const centi = Math.floor(time / 10) % 100;
    const d = x => (x < 10 ? "0" + x : "" + x);
    setCurrentTime(d(minutes) + ":" + d(seconds) + ":" + d(centi));
    if (time > target * 60000) {
      setCompleted(true);
      stop();
      document.getElementById("audio").play();
    }
  };

  return (
    <div className="App">
      <audio id="audio">
        <source src="powerUp6.mp3" type="audio/mpeg" />
      </audio>
      <div className="timer">{completed ? "COMPLETE" : currentTime}</div>
      {playing && (
        <div className="button" onClick={stop}>
          STOP
        </div>
      )}
      {!playing && (
        <div className="button" onClick={() => play(25)}>
          25 min
        </div>
      )}
      {!playing && (
        <div className="button" onClick={() => play(15)}>
          15 min
        </div>
      )}
      {!playing && (
        <div className="button" onClick={() => play(5)}>
          5 min
        </div>
      )}
      {!playing && (
        <div className="button" onClick={() => play(2)}>
          2 min
        </div>
      )}
    </div>
  );
};

export default App;
