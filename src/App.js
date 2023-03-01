import React, { useRef, useEffect, useState } from "react";
import './App.css';
import DrumPad from './DrumPad';
import * as Tone from 'tone';
import Q from './accets/gongdead.wav';
import W from './accets/44click8.wav';
import E from './accets/kick.mp3';
import A from './accets/psi-004.wav';
import S from './accets/cev.mp3';
import D from './accets/robotstep1.wav';
import Z from './accets/horrorroom.wav';
import X from './accets/44click6.wav';
import C from './accets/explosion2.wav';

const padObjects = [
  { sound: Q, pad: "Q" },
  { sound: W, pad: "W" },
  { sound: E, pad: "E" },
  { sound: A, pad: "A" },
  { sound: S, pad: "S" },
  { sound: D, pad: "D" },
  { sound: Z, pad: "Z" },
  { sound: X, pad: "X" },
  { sound: C, pad: "C" }
]

function App() {
  const [pad, setPad] = useState(padObjects);
  const drumPadsRef = useRef(null);

  useEffect(() => {
    function handleKeyDown(event) {
      const key = event.key.toUpperCase();
      const drumPad = drumPadsRef.current.querySelector(`#${key}`);
      if (drumPad) {
        drumPad.click();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="App" id="drum-machine">
      <div id="display">
      </div>
      <div className="drum-pads" ref={drumPadsRef}>
        {pad.map((pad, i) => {
          return (
            <DrumPad
              key={i}
              src={pad.sound}
              id={pad.pad}>
            </DrumPad>)
        })}
      </div>
    </div>
  );
}

export default App;
