import { useState } from 'react';
import './App.css';
import DrumPad from './DrumPad';
import * as Tone from 'tone';

function App() {
  const [pad, setPad] = useState(["Q", "W", "E", "A", "S", "D", "Z", "X", "C"]);

function handleClick() {
  const synth = new Tone.Synth().toDestination();
  synth.triggerAttackRelease("D1", "1n");
}

  return (
    <div className="App" id="drum-machine">
      <div id="display">
      </div>
      <>
        {pad.map((audioCode, i) => {
          return (
            <DrumPad
              className={"drum-pad"}
              key={i}
              id={"" + audioCode}
              audioCode={audioCode}
              onClick={() => {handleClick()}}>
            </DrumPad>)
        })}
      </>
    </div>
  );
}

export default App;
