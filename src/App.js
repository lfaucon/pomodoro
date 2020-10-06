import React, { useState } from 'react';
import './App.css';

var INTERVAL;
const MINUTE = 60000;

const App = () => {
  const [display, setDisplay] = useState('Pomodoro');
  const [step, setStep] = useState('stopped');

  const stop = () => {
    setStep('stopped');
    if (INTERVAL) clearInterval(INTERVAL);
    setDisplay('Focus Time!');
  };

  const play = (target, callback) => {
    if (INTERVAL) clearInterval(INTERVAL);
    const start = new Date();
    INTERVAL = setInterval(() => update(start, target, callback), 42);
  };

  const work = () => {
    setStep('working');
    play(25, () => {
      setStep('stopped');
      setDisplay('Work Session Completed!');
    });
  };

  const takeBreak = () => {
    setStep('relaxed');
    play(5, () => {
      setStep('stopped');
      setDisplay('Back to work');
    });
  };

  const update = (start, target, callback) => {
    const time = target * MINUTE - (new Date() - start);
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor(time / 1000) % 60;
    const centi = Math.floor(time / 10) % 100;
    const d = (x) => (x < 10 ? '0' + x : '' + x);
    setDisplay(d(minutes) + ':' + d(seconds) + ':' + d(centi));
    if (time < 0) {
      stop();
      document.getElementById('audio').play();
      callback();
    }
  };

  return (
    <div className="App">
      <audio id="audio">
        <source src="powerUp6.mp3" type="audio/mpeg" />
      </audio>
      <div className="timer">{display}</div>
      {step === 'stopped' && (
        <div className="button" onClick={work}>
          WORK
        </div>
      )}
      {step === 'stopped' && (
        <div className="button" onClick={takeBreak}>
          TAKE A BREAK
        </div>
      )}
      {(step === 'relaxed' || step === 'working') && (
        <div className="button" onClick={stop}>
          STOP
        </div>
      )}
      {step === 'working' && <div className="button">FOCUS!</div>}
      {step === 'relaxed' && <div className="button">Enjoy Life :)</div>}
    </div>
  );
};

export default App;
